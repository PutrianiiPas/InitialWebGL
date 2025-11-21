function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // buffer posisi lines T-5
    var lineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linesTfive), gl.STATIC_DRAW);

    // buffer warna lines
    var lineColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lineColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // buffer posisi triangles P
    var triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesP), gl.STATIC_DRAW);

    // buffer warna P
    var pColors = [];
    for (let i = 0; i < verticesP.length / 3; i++) {
        pColors.push(0.5, 0.0, 0.0); // merah
    }
    var pColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pColors), gl.STATIC_DRAW);

    // buffer normal utk P
    var normals = [];
    for (let i = 0; i < verticesP.length; i += 9) {
        // Ambil 3 titik (A, B, C) dari tiap segitiga
        let ax = verticesP[i],   ay = verticesP[i+1],   az = verticesP[i+2];
        let bx = verticesP[i+3], by = verticesP[i+4],   bz = verticesP[i+5];
        let cx = verticesP[i+6], cy = verticesP[i+7],   cz = verticesP[i+8];

        // Hitung dua vektor tepi
        let v1 = [bx - ax, by - ay, bz - az];
        let v2 = [cx - ax, cy - ay, cz - az];

        // Hitung cross product utk normal
        let nx = v1[1]*v2[2] - v1[2]*v2[1];
        let ny = v1[2]*v2[0] - v1[0]*v2[2];
        let nz = v1[0]*v2[1] - v1[1]*v2[0];

        // Normalisasi
        let len = Math.sqrt(nx*nx + ny*ny + nz*nz);
        if (len > 0) {
            nx /= len; ny /= len; nz /= len;
        }

        // Push normal yang sama utk ketiga vertex segitiga
        for (let j = 0; j < 3; j++) {
            normals.push(nx, ny, nz);
        }
    }
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    // shader
    // vertex shader
    var vertexShaderCode = document.getElementById("vertexShaderCode").text;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // fragment shader dengan Phong Lighting
    var fragmentShaderCode = `
        precision mediump float;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying vec3 vNormal;

        uniform vec3 uAmbientColor;
        uniform float uAmbientIntensity;
        uniform vec3 uDiffuseColor;
        uniform vec3 uDiffusePosition;
        uniform mat3 uNormalMatrix;
        uniform vec3 uViewerPosition;

        void main() {
            // Ambient lighting
            vec3 ambient = vColor * uAmbientColor * uAmbientIntensity;

            // Diffuse lighting
            vec3 lightPos = uDiffusePosition;
            vec3 vlight = normalize(lightPos - vPosition);
            vec3 normalizedNormal = normalize(uNormalMatrix * vNormal);
            
            float cosTheta = dot(normalizedNormal, vlight);
            vec3 diffuse = vec3(0.0);
            if (cosTheta > 0.0) {
                diffuse = vColor * uDiffuseColor * cosTheta;
            }

            // Specular lighting
            vec3 reflector = reflect(-vlight, normalizedNormal);
            vec3 normalizedViewer = normalize(uViewerPosition - vPosition);
            float cosPhi = dot(reflector, normalizedViewer);
            vec3 specular = vec3(0.0);
            if (cosPhi > 0.0) {
                float shininess = 100.0;
                specular = vColor * uDiffuseColor * pow(cosPhi, shininess);
            }

            vec3 phong = ambient + diffuse + specular;
            gl_FragColor = vec4(phong, 1.0);
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);    

    // program
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    var aPos = gl.getAttribLocation(program, "aPosition");
    var aColor = gl.getAttribLocation(program, "aColor");
    var aNormal = gl.getAttribLocation(program, "aNormal");

    // Setup lighting uniforms (disesuaikan untuk warna lebih rata)
    var uAmbientColor = gl.getUniformLocation(program, 'uAmbientColor');
    gl.uniform3fv(uAmbientColor, [1.0, 1.0, 1.0]); // Lebih terang
    
    var uAmbientIntensity = gl.getUniformLocation(program, 'uAmbientIntensity');
    gl.uniform1f(uAmbientIntensity, 0.9); // Dinaikkan untuk warna lebih rata
    
    var uDiffuseColor = gl.getUniformLocation(program, 'uDiffuseColor');
    gl.uniform3fv(uDiffuseColor, [1.0, 1.0, 1.0]);
    
    var uDiffusePosition = gl.getUniformLocation(program, 'uDiffusePosition');
    gl.uniform3fv(uDiffusePosition, [1.0, 2.0, 0.0]); // Cahaya dari depan
    
    var uNormalMatrix = gl.getUniformLocation(program, 'uNormalMatrix');
    
    var uViewerPosition = gl.getUniformLocation(program, "uViewerPosition");
    gl.uniform3fv(uViewerPosition, [1.0, 0.0, 3.0]);

    var angle = 0;
    function render(time){
        if (!freeze){
            angle += 0.01;
        }

        // Dapatkan rotation matrix dari helper.js
        var sa = Math.sin(angle);
        var ca = Math.cos(angle);
        
        // Buat model matrix untuk rotasi Y
        var modelMatrix = new Float32Array([
            ca, 0.0, sa, 0.0,
            0.0, 1.0, 0.0, 0.0,
            -sa, 0.0, ca, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
        
        // Set uFormMatrix
        var uFormMatrix = gl.getUniformLocation(program, 'uFormMatrix');
        gl.uniformMatrix4fv(uFormMatrix, false, modelMatrix);

        // Update normal matrix (ambil bagian 3x3 dari model matrix)
        var normalMatrix = new Float32Array([
            ca, 0.0, -sa,
            0.0, 1.0, 0.0,
            sa, 0.0, ca
        ]);
        gl.uniformMatrix3fv(uNormalMatrix, false, normalMatrix);

        // clear canvas
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(1, 1, 1, 1); // bg putih
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // hubungkan atribut posisi line, draw lines
        gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPos);

        // hubungkan atribut warna line
        gl.bindBuffer(gl.ARRAY_BUFFER, lineColorBuffer);
        gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aColor);

        gl.drawArrays(gl.LINES, 0, linesTfive.length / 3);

        // hubungkan atribut posisi triangle
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPos);

        // hubungkan atribut warna triangle
        gl.bindBuffer(gl.ARRAY_BUFFER, pColorBuffer);
        gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aColor);

        // hubungkan atribut normal
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aNormal);
        
        gl.drawArrays(gl.TRIANGLES, 0, verticesP.length / 3);

        requestAnimationFrame(render);
    }

    render();    
}