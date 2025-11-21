// Definisi titik-titik huruf P (3D dengan kedalaman 0.1)
var pPoints = {
    // ========== BAGIAN DEPAN (z = 0.0) ==========
    
    // Batang vertikal kiri
    A: [-0.73, 0.4, 0.0],    // Kiri atas luar
    B: [-0.73, -0.1, 0.0],   // Kiri bawah luar
    C: [-0.65, -0.1, 0.0],   // Kiri bawah dalam
    D: [-0.65, 0.4, 0.0],    // Kiri atas dalam
    
    // Lengkungan luar P (dari atas ke bawah, searah jarum jam)
    E: [-0.65, 0.4, 0.0],    // Awal lengkungan (sambungan dengan batang)
    F: [-0.57, 0.4, 0.0],    // Puncak lengkungan
    G: [-0.47, 0.35, 0.0],   // Sisi kanan atas
    H: [-0.43, 0.25, 0.0],    // Ujung kanan tengah
    I: [-0.47, 0.15, 0.0],   // Sisi kanan bawah
    J: [-0.58, 0.1, 0.0],    // Dasar lengkungan
    K: [-0.65, 0.1, 0.0],    // Akhir lengkungan (kembali ke batang)
    
    // Lengkungan dalam (hollow) - membentuk rongga P
    L: [-0.65, 0.32, 0.0],   // Dalam atas
    M: [-0.57, 0.32, 0.0],   // Dalam puncak
    N: [-0.50, 0.28, 0.0],   // Dalam kanan atas
    O: [-0.50, 0.25, 0.0],   // Dalam kanan tengah
    P: [-0.50, 0.22, 0.0],   // Dalam kanan bawah
    Q: [-0.57, 0.18, 0.0],   // Dalam dasar
    R: [-0.65, 0.18, 0.0],   // Dalam kiri bawah
    
    // ========== BAGIAN BELAKANG (z = 0.1) ==========
    
    // Batang vertikal kiri (belakang)
    A2: [-0.73, 0.4, 0.1],
    B2: [-0.73, -0.1, 0.1],
    C2: [-0.65, -0.1, 0.1],
    D2: [-0.65, 0.4, 0.1],
    
    // Lengkungan luar P (belakang)
    E2: [-0.65, 0.4, 0.1],
    F2: [-0.57, 0.4, 0.1],
    G2: [-0.47, 0.35, 0.1],
    H2: [-0.43, 0.25, 0.1],
    I2: [-0.47, 0.15, 0.1],
    J2: [-0.58, 0.1, 0.1],
    K2: [-0.65, 0.1, 0.1],
    
    // Lengkungan dalam (belakang)
    L2: [-0.65, 0.32, 0.1],
    M2: [-0.57, 0.32, 0.1],
    N2: [-0.50, 0.28, 0.1],
    O2: [-0.50, 0.25, 0.1],
    P2: [-0.50, 0.22, 0.1],
    Q2: [-0.57, 0.18, 0.1],
    R2: [-0.65, 0.18, 0.1]
};

var verticesP = [];

// Helper function untuk membuat triangle
function addTriangleP(p1, p2, p3) {
    verticesP.push(...p1, ...p2, ...p3);
}

// ========== BAGIAN DEPAN (z = 0.0) ==========

// 1. Batang vertikal kiri
addTriangleP(pPoints.A, pPoints.B, pPoints.C);
addTriangleP(pPoints.A, pPoints.C, pPoints.D);

// 2. Batang tengah (menghubungkan ke lengkungan)
addTriangleP(pPoints.D, pPoints.K, pPoints.R);
addTriangleP(pPoints.D, pPoints.R, pPoints.C);

addTriangleP(pPoints.C, pPoints.R, pPoints.B);
addTriangleP(pPoints.C, pPoints.K, pPoints.B);

// 3. Lengkungan luar atas (E-F-G-H)
addTriangleP(pPoints.E, pPoints.F, pPoints.M);
addTriangleP(pPoints.E, pPoints.M, pPoints.L);

addTriangleP(pPoints.F, pPoints.G, pPoints.N);
addTriangleP(pPoints.F, pPoints.N, pPoints.M);

addTriangleP(pPoints.G, pPoints.H, pPoints.O);
addTriangleP(pPoints.G, pPoints.O, pPoints.N);

// 4. Lengkungan luar bawah (H-I-J-K)
addTriangleP(pPoints.H, pPoints.I, pPoints.P);
addTriangleP(pPoints.H, pPoints.P, pPoints.O);

addTriangleP(pPoints.I, pPoints.J, pPoints.Q);
addTriangleP(pPoints.I, pPoints.Q, pPoints.P);

addTriangleP(pPoints.J, pPoints.K, pPoints.R);
addTriangleP(pPoints.J, pPoints.R, pPoints.Q);

// 5. Sambungan atas lengkungan
addTriangleP(pPoints.K, pPoints.E, pPoints.L);
addTriangleP(pPoints.K, pPoints.L, pPoints.R);

// ========== BAGIAN BELAKANG (z = 0.1) - urutan terbalik ==========

// 1. Batang vertikal kiri
addTriangleP(pPoints.A2, pPoints.C2, pPoints.B2);
addTriangleP(pPoints.A2, pPoints.D2, pPoints.C2);

// 2. Batang tengah
addTriangleP(pPoints.D2, pPoints.R2, pPoints.K2);
addTriangleP(pPoints.D2, pPoints.C2, pPoints.R2);

addTriangleP(pPoints.C2, pPoints.B2, pPoints.R2);
addTriangleP(pPoints.C2, pPoints.B2, pPoints.K2);

// 3. Lengkungan luar atas
addTriangleP(pPoints.E2, pPoints.M2, pPoints.F2);
addTriangleP(pPoints.E2, pPoints.L2, pPoints.M2);

addTriangleP(pPoints.F2, pPoints.N2, pPoints.G2);
addTriangleP(pPoints.F2, pPoints.M2, pPoints.N2);

addTriangleP(pPoints.G2, pPoints.O2, pPoints.H2);
addTriangleP(pPoints.G2, pPoints.N2, pPoints.O2);

// 4. Lengkungan luar bawah
addTriangleP(pPoints.H2, pPoints.P2, pPoints.I2);
addTriangleP(pPoints.H2, pPoints.O2, pPoints.P2);

addTriangleP(pPoints.I2, pPoints.Q2, pPoints.J2);
addTriangleP(pPoints.I2, pPoints.P2, pPoints.Q2);

addTriangleP(pPoints.J2, pPoints.R2, pPoints.K2);
addTriangleP(pPoints.J2, pPoints.Q2, pPoints.R2);

// 5. Sambungan atas lengkungan
addTriangleP(pPoints.K2, pPoints.L2, pPoints.E2);
addTriangleP(pPoints.K2, pPoints.R2, pPoints.L2);

// ========== SISI SAMPING (menghubungkan depan dan belakang) ==========

// Sisi batang vertikal
addTriangleP(pPoints.A, pPoints.A2, pPoints.B2);
addTriangleP(pPoints.A, pPoints.B2, pPoints.B);

addTriangleP(pPoints.B, pPoints.B2, pPoints.C2);
addTriangleP(pPoints.B, pPoints.C2, pPoints.C);

addTriangleP(pPoints.C, pPoints.C2, pPoints.D2);
addTriangleP(pPoints.C, pPoints.D2, pPoints.D);

addTriangleP(pPoints.D, pPoints.D2, pPoints.A2);
addTriangleP(pPoints.D, pPoints.A2, pPoints.A);

// Sisi lengkungan luar
addTriangleP(pPoints.E, pPoints.E2, pPoints.F2);
addTriangleP(pPoints.E, pPoints.F2, pPoints.F);

addTriangleP(pPoints.F, pPoints.F2, pPoints.G2);
addTriangleP(pPoints.F, pPoints.G2, pPoints.G);

addTriangleP(pPoints.G, pPoints.G2, pPoints.H2);
addTriangleP(pPoints.G, pPoints.H2, pPoints.H);

addTriangleP(pPoints.H, pPoints.H2, pPoints.I2);
addTriangleP(pPoints.H, pPoints.I2, pPoints.I);

addTriangleP(pPoints.I, pPoints.I2, pPoints.J2);
addTriangleP(pPoints.I, pPoints.J2, pPoints.J);

addTriangleP(pPoints.J, pPoints.J2, pPoints.K2);
addTriangleP(pPoints.J, pPoints.K2, pPoints.K);

// Sisi lengkungan dalam (hollow)
addTriangleP(pPoints.L, pPoints.L2, pPoints.M2);
addTriangleP(pPoints.L, pPoints.M2, pPoints.M);

addTriangleP(pPoints.M, pPoints.M2, pPoints.N2);
addTriangleP(pPoints.M, pPoints.N2, pPoints.N);

addTriangleP(pPoints.N, pPoints.N2, pPoints.O2);
addTriangleP(pPoints.N, pPoints.O2, pPoints.O);

addTriangleP(pPoints.O, pPoints.O2, pPoints.P2);
addTriangleP(pPoints.O, pPoints.P2, pPoints.P);

addTriangleP(pPoints.P, pPoints.P2, pPoints.Q2);
addTriangleP(pPoints.P, pPoints.Q2, pPoints.Q);

addTriangleP(pPoints.Q, pPoints.Q2, pPoints.R2);
addTriangleP(pPoints.Q, pPoints.R2, pPoints.R);

// Sambungan sisi atas dan bawah hollow
addTriangleP(pPoints.R, pPoints.R2, pPoints.L2);
addTriangleP(pPoints.R, pPoints.L2, pPoints.L);

addTriangleP(pPoints.K, pPoints.K2, pPoints.E2);
addTriangleP(pPoints.K, pPoints.E2, pPoints.E);

// Data utk T-5 (lines)
var linesTfive = [
  // DEPAN
  // untuk huruf T
  -0.34, 0.4, 0.0,   0.0, 0.4, 0.0,   // G-H
  -0.34, 0.4, 0.0,  -0.34, 0.3, 0.0,  // G-I
  -0.34, 0.3, 0.0,  -0.21, 0.3, 0.0,  // I-J
   0.0, 0.4, 0.0,    0.0, 0.3, 0.0,   // H-K
   0.0, 0.3, 0.0,   -0.13, 0.3, 0.0,  // K-L
  -0.21, 0.3, 0.0,  -0.21, -0.1, 0.0, // J-M
  -0.13, 0.3, 0.0,  -0.13, -0.1, 0.0, // L-N
  -0.21, -0.1, 0.0, -0.13, -0.1, 0.0, // M-N

  // strip (balok)
  0.02, 0.11, 0.0,  0.02, 0.17, 0.0,  // a-b
  0.02, 0.17, 0.0,  0.22, 0.17, 0.0,  // b-c
  0.22, 0.17, 0.0,  0.22, 0.11, 0.0,  // c-d
  0.22, 0.11, 0.0,  0.02, 0.11, 0.0,  // d-a

  // untuk angka 5
  0.72, 0.4, 0.0,   0.35, 0.4, 0.0,   // M-N
  0.35, 0.4, 0.0,   0.35, 0.15, 0.0,  // N-O
  0.35, 0.15, 0.0,  0.65, 0.17, 0.0,  // O-P
  0.65, 0.17, 0.0,  0.75, 0.08, 0.0,  // P-Q
  0.75, 0.08, 0.0,  0.7, -0.05, 0.0,  // Q-R
  0.7, -0.05, 0.0,  0.4, -0.1, 0.0,   // R-S

  // BELAKANG
  // untuk huruf T
  -0.34, 0.4, 0.1,   0.0, 0.4, 0.1,   // G’-H’
  -0.34, 0.4, 0.1,  -0.34, 0.3, 0.1,  // G’-I’
  -0.34, 0.3, 0.1,  -0.21, 0.3, 0.1,  // I’-J’
   0.0, 0.4, 0.1,    0.0, 0.3, 0.1,   // H’-K’
   0.0, 0.3, 0.1,   -0.13, 0.3, 0.1,  // K’-L’
  -0.21, 0.3, 0.1,  -0.21, -0.1, 0.1, // J’-M’
  -0.13, 0.3, 0.1,  -0.13, -0.1, 0.1, // L’-N’
  -0.21, -0.1, 0.1, -0.13, -0.1, 0.1, // M’-N’

  // strip (balok)
  0.05, 0.13, -0.1,  0.05, 0.19, -0.1,  // a’-b’
  0.05, 0.19, -0.1,  0.25, 0.19, -0.1,  // b’-c’
  0.25, 0.19, -0.1,  0.25, 0.13, -0.1,  // c’-d’
  0.25, 0.13, -0.1,  0.05, 0.13, -0.1,  // d’-a’

  // untuk angka 5
  0.72, 0.4, 0.1,   0.35, 0.4, 0.1,   // M’-N’
  0.35, 0.4, 0.1,   0.35, 0.15, 0.1,  // N’-O’
  0.35, 0.15, 0.1,  0.65, 0.17, 0.1,  // O’-P’
  0.65, 0.17, 0.1,  0.75, 0.08, 0.1,  // P’-Q’
  0.75, 0.08, 0.1,  0.7, -0.05, 0.1,  // Q’-R’
  0.7, -0.05, 0.1,  0.4, -0.1, 0.1,   // R’-S’

  // PENGHUBUNG
  // untuk huruf T
  -0.34, 0.4, 0.0,  -0.34, 0.4, 0.1,   // G-G’
   0.0, 0.4, 0.0,    0.0, 0.4, 0.1,    // H-H’
  -0.34, 0.3, 0.0,  -0.34, 0.3, 0.1,   // I-I’
   0.0, 0.3, 0.0,    0.0, 0.3, 0.1,    // K-K’
  -0.21, -0.1, 0.0, -0.21, -0.1, 0.1,  // M-M’
  -0.13, -0.1, 0.0, -0.13, -0.1, 0.1,  // N-N’

  // strip (balok)
  0.02, 0.11, 0.0,   0.05, 0.13, -0.1,  // a-a’
  0.02, 0.17, 0.0,   0.05, 0.19, -0.1,  // b-b’
  0.22, 0.17, 0.0,   0.25, 0.19, -0.1,  // c-c’
  0.22, 0.11, 0.0,   0.25, 0.13, -0.1,  // d-d’

  // untuk angka 5
  0.72, 0.4, 0.0,    0.72, 0.4, 0.1,    // M-M’
  0.35, 0.4, 0.0,    0.35, 0.4, 0.1,    // N-N’
  0.35, 0.15, 0.0,   0.35, 0.15, 0.1,   // O-O’
  0.65, 0.17, 0.0,   0.65, 0.17, 0.1,   // P-P’
  0.75, 0.08, 0.0,   0.75, 0.08, 0.1,   // Q-Q’
  0.7, -0.05, 0.0,   0.7, -0.05, 0.1,   // R-R’
  0.4, -0.1, 0.0,    0.4, -0.1, 0.1     // S-S’
];

var colors = [];
for (var i = 0; i < linesTfive.length / 3; i++) {
  if (i % 4 === 0) {
    colors.push(1.0, 0.0, 0.0); // red
  } else if (i % 4 === 1) {
    colors.push(0.0, 1.0, 0.0); // green
  } else if (i % 4 === 2) {
    colors.push(0.0, 0.0, 1.0); // blue
  } else {
    colors.push(1.0, 1.0, 0.0); // yellow
  }
}