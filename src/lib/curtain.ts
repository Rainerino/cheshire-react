import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import curtain_texture from '/textures/curtain.png';
import * as CANNON from 'cannon-es';

const clothMass = 1;
const clothSize = 1.3;
const Nx = 15;
const Ny = 15;
const mass = (clothMass / Nx) * Ny;
const restDistance = clothSize / Nx;

const sphereSize = 0.8;
const movementRadius = 0.2;
const sphereOffset = new THREE.Vector3(0, -0.4, 0.7);

const timeStep = 18 / 1000;
class CurtainSimulation{
    public sphereMesh!: THREE.Mesh;
    public clothMesh!: THREE.Mesh;
    private clothGeometry!: ParametricGeometry;
    private world: CANNON.World;
    private lastCallTime!: number;
    private sphereBody!: CANNON.Body;
    private particles: CANNON.Body[][] = [];
    private windForce: THREE.Vector3;
    private curtain_position: THREE.Vector3;
    private curtain_rotation: THREE.Euler;

    constructor(position: THREE.Vector3, rotation: THREE.Euler) {
        this.world = new CANNON.World();
        this.windForce = new THREE.Vector3(0, 0, -1)
        this.curtain_position = position;
        this.curtain_rotation = rotation;
        this.initCannon();
        this.initThree();
    }

    private clothFunction = (u: number, v: number, target: THREE.Vector3) => {
        const x = (u - 0.5) * restDistance * Nx;
        const y = (v + 0.5) * restDistance * Ny;
        const z = 0;
        target.set(x, y, z);
        return target;
    };

    private initCannon() {
        this.world.gravity.set(0, -9.81, 0);

        const solver = new CANNON.GSSolver();
        solver.iterations = 20;
        this.world.solver = solver;

        const clothMaterial = new CANNON.Material('cloth');
        const sphereMaterial = new CANNON.Material('sphere');
        const cloth_sphere = new CANNON.ContactMaterial(clothMaterial, sphereMaterial, {
            friction: 0,
            restitution: 0,
        });
        cloth_sphere.contactEquationStiffness = 1e9;
        cloth_sphere.contactEquationRelaxation = 3;
        this.world.addContactMaterial(cloth_sphere);

        const sphereShape = new CANNON.Sphere(sphereSize * 1.1);
        this.sphereBody = new CANNON.Body({
            type: CANNON.Body.KINEMATIC,
        });
        this.sphereBody.position.set(
            this.curtain_position.x + sphereOffset.x,
            this.curtain_position.y + sphereOffset.y,
            this.curtain_position.z + sphereOffset.z
        );
        this.sphereBody.velocity.set(0, 0, 0);
        this.sphereBody.addShape(sphereShape);
        this.world.addBody(this.sphereBody);

        for (let i = 0; i < Nx + 1; i++) {
            this.particles.push([]);
            for (let j = 0; j < Ny + 1; j++) {
                const point = this.clothFunction(i / (Nx + 1), j / (Ny + 1), new THREE.Vector3());
                const particle = new CANNON.Body({
                    mass: j === Ny ? 0 : mass,
                });
                particle.position = new CANNON.Vec3(this.curtain_position.x, this.curtain_position.y, this.curtain_position.z);
                particle.addShape(new CANNON.Particle());
                particle.linearDamping = 0.5;
                particle.position.set(point.x, point.y - Ny * 0.9 * restDistance, point.z);
                particle.velocity.set(0, 0, -0.1 * (Ny - j));
                this.particles[i].push(particle);
                this.world.addBody(particle);
            }
        }

        const connect = (i1: number, j1: number, i2: number, j2: number) => {
            this.world.addConstraint(
                new CANNON.DistanceConstraint(this.particles[i1][j1], this.particles[i2][j2], restDistance)
            );
        };
        for (let i = 0; i < Nx + 1; i++) {
            for (let j = 0; j < Ny + 1; j++) {
                if (i < Nx) connect(i, j, i + 1, j);
                if (j < Ny) connect(i, j, i, j + 1);
            }
        }
    }

    private initThree() {
        const clothTexture = new THREE.TextureLoader().load(curtain_texture);
        clothTexture.wrapS = THREE.RepeatWrapping;
        clothTexture.wrapT = THREE.RepeatWrapping;
        clothTexture.anisotropy = 8;

        // Enable shadow for curtain mesh and sphere mesh
        // (Sphere mesh is created later, but you can set it after creation)
        const clothMaterial = new THREE.MeshPhongMaterial({
            map: clothTexture,
            side: THREE.DoubleSide,
        });
        this.clothGeometry = new ParametricGeometry(this.clothFunction, Nx, Ny);

        this.clothMesh = new THREE.Mesh(this.clothGeometry, clothMaterial);
        this.clothMesh.castShadow = true;
        this.clothMesh.receiveShadow = true;
        this.clothMesh.position.set(this.curtain_position.x, this.curtain_position.y, this.curtain_position.z);
        this.clothMesh.rotation.set(this.curtain_rotation.x, this.curtain_rotation.y, this.curtain_rotation.z);

        const sphereGeometry = new THREE.SphereGeometry(sphereSize, 20, 20);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

        this.sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    }

    private updatePhysics(delta_time: number) {
        const time = performance.now() / 1000;
        if (!this.lastCallTime) {
            this.world.step(timeStep);
        } else {
            const dt = time - this.lastCallTime;
            this.world.step(timeStep, dt);
        }
        this.lastCallTime = time;
    }

    private simulateWind() {
        const windStrength = Math.abs(Math.cos(this.world.time / 10)) * 0.5 + 1.5;
        this.windForce = new THREE.Vector3(0, 0, -1);
        this.windForce.normalize();
        this.windForce.multiplyScalar(windStrength);
        for (let i = 0; i < Nx + 1; i++) {
            for (let j = 0; j < Ny + 1; j++) {
                const particle = this.particles[i][j];
                particle.applyLocalForce(
                    new CANNON.Vec3(this.windForce.x, this.windForce.y, this.windForce.z),
                    particle.position
                );
            }
        }
    }

    public update(delta_time: number) {
        this.updatePhysics(delta_time);
        this.simulateWind();

        for (let i = 0; i < Nx + 1; i++) {
            for (let j = 0; j < Ny + 1; j++) {
                const index = j * (Nx + 1) + i;
                this.clothGeometry.attributes['position'].setXYZ(
                    index,
                    this.particles[i][j].position.x,
                    this.particles[i][j].position.y,
                    this.particles[i][j].position.z
                );
            }
        }

        this.clothGeometry.attributes['position'].needsUpdate = true;
        this.clothGeometry.computeVertexNormals();

        const { time } = this.world;
        this.sphereBody.position.set(
            Math.sin(time * 2) * movementRadius + sphereOffset.x,
            sphereOffset.y,
            Math.cos(time * 2) * movementRadius + sphereOffset.z
        );

        // this.sphereMesh.position.copy(this.sphereBody.position);
        this.sphereMesh.position.setX(-this.sphereBody.position.z);
        this.sphereMesh.position.setY(-this.sphereBody.position.y);
        this.sphereMesh.position.setZ(this.sphereBody.position.x);
    }
}


export default CurtainSimulation;