            var container, camera, scene, renderer, group, text;
            var targetRotation = 0;
            var targetRotationOnMouseDown = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            init();
            animate();

            function init() {

                container = document.createElement( 'div' );
                document.body.appendChild(container);

                camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.set( 0, 150, 500 );

                scene = new THREE.Scene();


                var theText = 'Azou';

                var hash = document.location.hash.substr( 1 );

                if ( hash.length !== 0 ) {

                    theText = hash;

                }

                var text3d = new THREE.TextGeometry( theText, {

                    size: 80,
                    height: 20,
                    curveSegments: 2,
                    font: 'helvetiker'

                });

                text3d.computeBoundingBox();
                var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

                var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } );
                text = new THREE.Mesh( text3d, textMaterial );

                text.position.x = centerOffset;
                text.position.y = 100;
                text.position.z = 0;

                text.rotation.x = 0;
                text.rotation.y = Math.PI * 2;

                group = new THREE.Object3D();
                group.add( text );

                scene.add( group );

                renderer = new THREE.CanvasRenderer();
                renderer.setClearColor( 0xf0f0f0 );
                renderer.setSize( window.innerWidth, window.innerHeight );

                container.appendChild( renderer.domElement );


                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );


                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentMouseDown( event ) {

                event.preventDefault();

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'mouseup', onDocumentMouseUp, false );
                document.addEventListener( 'mouseout', onDocumentMouseOut, false );

                mouseXOnMouseDown = event.clientX - windowHalfX;
                targetRotationOnMouseDown = targetRotation;

            }

            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;

                targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

            }

            function onDocumentMouseUp( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

            }

            function onDocumentMouseOut( event ) {

                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length == 1 ) {

                    event.preventDefault();

                    mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotationOnMouseDown = targetRotation;

                }

            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length == 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

                }

            }



            function animate() {

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
                renderer.render( scene, camera );

            }
