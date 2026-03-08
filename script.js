// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#34495e';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = '#2c3e50';
        header.style.boxShadow = 'none';
    }
});

// Simple animation for research cards on scroll
const researchCards = document.querySelectorAll('.research-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

researchCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Contact form submission (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a placeholder form.');
            this.reset();
        });
    }
});

// 3D Model Viewer
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the 3D model section
    const modelSection = document.getElementById('3d-model');
    if (modelSection) {
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        // Create camera
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const modelViewer = document.getElementById('model-viewer');
        if (modelViewer) {
            renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
            modelViewer.appendChild(renderer.domElement);

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // Add orbit controls for interaction
            let isDragging = false;
            let previousMousePosition = {
                x: 0,
                y: 0
            };

            // Mouse events for rotation
            renderer.domElement.addEventListener('mousedown', function(e) {
                isDragging = true;
                e.preventDefault();
            });

            window.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    const deltaX = e.clientX - previousMousePosition.x;
                    const deltaY = e.clientY - previousMousePosition.y;

                    scene.rotation.y += deltaX * 0.01;
                    scene.rotation.x += deltaY * 0.01;
                }
                previousMousePosition.x = e.clientX;
                previousMousePosition.y = e.clientY;
            });

            window.addEventListener('mouseup', function() {
                isDragging = false;
            });

            // Zoom with mouse wheel
            renderer.domElement.addEventListener('wheel', function(e) {
                e.preventDefault();
                camera.position.z += e.deltaY * 0.01;
                camera.position.z = Math.min(Math.max(camera.position.z, 2), 10);
            });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (modelViewer) {
                    camera.aspect = modelViewer.clientWidth / modelViewer.clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(modelViewer.clientWidth, modelViewer.clientHeight);
                }
            });

            // Create a simple fallback visualization if STL loading fails
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({
                color: 0x4169E1,
                wireframe: true
            });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Add grid helper
            const gridHelper = new THREE.GridHelper(5, 5);
            scene.add(gridHelper);

            // Add axes helper
            const axesHelper = new THREE.AxesHelper(3);
            scene.add(axesHelper);

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.005;
                cube.rotation.y += 0.005;
                renderer.render(scene, camera);
            }

            animate();
        }
    }
});