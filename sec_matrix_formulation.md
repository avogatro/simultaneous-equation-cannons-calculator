# Mathematical Matrix Formulation of Simultaneous Equation Cannons (SEC)

This document formalizes the gameplay mechanics of the Yu-Gi-Oh! card **Simultaneous Equation Cannons** using linear algebra, matrix transformations, and discrete convolution.

---

## TL;DR for Average Players (The Quick Math)

If you want to solve the card in your head without matrices, you can use these two simple math formulas:

1. **To find the Xyz Rank ($X$) you must send:**
   $$X = \text{Total Cards} - \text{Opponent Monster Level}$$
   *   **Constraint:** If this result is not a Rank of Xyz monster in your Extra Deck (with at least 2 copies remaining), you **cannot** resolve the card.

2. **To find the Fusion Level ($F$) you must send:**
   $$F = 2 \times \text{Opponent Monster Level} - \text{Total Cards}$$
   *   **Constraint:** If this result is not a Level of Fusion monster in your Extra Deck, you **cannot** resolve the card.

### Quick Example:
*   Opponent controls a **Level 8** monster ($L = 8$).
*   There are **11 cards** in play ($T = 11$).
*   **Xyz Rank to send:** $11 - 8 = \mathbf{3}$ (You must have Rank 3 Xyz monsters).
*   **Fusion Level to send:** $2(8) - 11 = 16 - 11 = \mathbf{5}$ (You must have a Level 5 Fusion).

---

## Part 1: The Standard Setting (Linear Algebra Form)

In the standard setting (without pre-banished monsters), the relationship between your deck configuration and the valid game states is a direct linear system.

Let your Extra Deck be represented by:
*   **Fusion levels vector ($\mathbf{f}$):** $\mathbf{f} = \begin{bmatrix} f_1 & f_2 & \dots & f_m \end{bmatrix}^T$
*   **Xyz ranks vector ($\mathbf{x}$):** $\mathbf{x} = \begin{bmatrix} x_1 & x_2 & \dots & x_n \end{bmatrix}$

### 1. Game State Space Matrices
For any combination of Fusion level index $i$ and Xyz rank index $j$ in your deck:
*   The Opponent Monster Level to target is $L_{ij} = f_i + x_j$.
*   The Total Cards in play required is $T_{ij} = f_i + 2x_j$.

Using outer vector sums, we can represent the entire grid of game states as matrices $\mathbf{L}$ and $\mathbf{T}$:

$$\mathbf{L} = \mathbf{f} \mathbf{1}_n + \mathbf{1}_m \mathbf{x} = \begin{bmatrix}
f_1 + x_1 & f_1 + x_2 & \dots & f_1 + x_n \\
f_2 + x_1 & f_2 + x_2 & \dots & f_2 + x_n \\
\vdots & \vdots & \ddots & \vdots \\
f_m + x_1 & f_m + x_2 & \dots & f_m + x_n
\end{bmatrix}$$

$$\mathbf{T} = \mathbf{f} \mathbf{1}_n + 2(\mathbf{1}_m \mathbf{x}) = \begin{bmatrix}
f_1 + 2x_1 & f_1 + 2x_2 & \dots & f_1 + 2x_n \\
f_2 + 2x_1 & f_2 + 2x_2 & \dots & f_2 + 2x_n \\
\vdots & \vdots & \ddots & \vdots \\
f_m + 2x_1 & f_m + 2x_2 & \dots & f_m + 2x_n
\end{bmatrix}$$

### 2. Solving the System (Inverse Transformation)
To determine the required deck elements $(F, X)$ to solve a target game state $(L, T)$, we solve the system of linear equations:

$$\mathbf{A} \begin{bmatrix} F \\ X \end{bmatrix} = \begin{bmatrix} L \\ T \end{bmatrix} \quad \text{where} \quad \mathbf{A} = \begin{bmatrix} 1 & 1 \\ 1 & 2 \end{bmatrix}$$

Since $\det(\mathbf{A}) = 2(1) - 1(1) = 1 \neq 0$, the transformation is invertible. The inverse matrix is:

$$\mathbf{A}^{-1} = \begin{bmatrix} 2 & -1 \\ -1 & 1 \end{bmatrix}$$

Thus, the exact Fusion level $F$ and Xyz rank $X$ required are solved directly by:

$$\begin{bmatrix} F \\ X \end{bmatrix} = \mathbf{A}^{-1} \begin{bmatrix} L \\ T \end{bmatrix} \implies \begin{aligned} F &= 2L - T \\ X &= T - L \end{aligned}$$

### Python Implementation (Vectorized)
```python
import numpy as np

# 1. Generate L and T matrices from deck vectors
f = np.array([2, 3, 4, 5, 6])  # Fusion levels (shape: (5,))
x = np.array([2, 3, 4, 5, 6])  # Xyz ranks (shape: (5,))

# 2. Solve for required F and X given game state (L, T)
A_inv = np.array([[2, -1],
                  [-1, 1]])

# Target game state: Opponent level 8, Total cards 11
target_state = np.array([8, 11])

# Matrix-vector multiplication to find required levels
F_req, X_req = A_inv @ target_state

# Verify if the required levels exist in our deck
is_valid = F_req in f and X_req in x

print(f"Is solution valid (present in deck)? {is_valid}")
if is_valid:
    print(f"Required levels for (L=8, T=11) -> Fusion: {F_req}, Xyz: {X_req}")
else:
    print(f"Required levels for (L=8, T=11) -> Fusion: {F_req}, Xyz: {X_req}")
    print("Solution is not valid (not present in deck).")
```

### 3. Generating the Grid/Matrix View (Vectorized Mapping)
In the application UI, the solutions are displayed as a matrix where:
*   The **rows (Y-axis)** represent the target Opponent Monster Levels ($L$).
*   The **columns (X-axis)** represent the Total Card Counts ($T$).

Rather than checking states iteratively, we can compute the entire 2D grid of valid solutions simultaneously in Python. We do this by defining the range of $L$ and $T$, projecting them into 2D space using broadcasting, and checking deck membership using `np.isin`:

```python
import numpy as np

# 1. Generate L and T matrices from deck vectors
f = np.array([2, 3, 4, 5, 6])  # Fusion levels (shape: (5,))
x = np.array([2, 3, 4, 5, 6])  # Xyz ranks (shape: (5,))

# Define target row/column ranges for the grid
L_min, L_max = 4, 12
T_min, T_max = 6, 18

L_range = np.arange(L_min, L_max + 1)  # Rows (Y-axis, shape: (9,)) = array([ 4,  5,  6,  7,  8,  9, 10, 11, 12])
T_range = np.arange(T_min, T_max + 1)  # Columns (X-axis, shape: (13,)) = array([ 6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18])

# Create 2D grids of coordinates using broadcasting.
# np.newaxis adds a new dimension to the 1D arrays:
# L_grid becomes a column 2D vector (shape: 9x1) = array([[ 4],[ 5],[ 6],[ 7],[ 8],[ 9],[10],[11],[12]])
# imagine a 2D matrix where every column is the same and has values [4, 5, 6, 7, 8, 9, 10, 11, 12]^T
L_grid = L_range[:, np.newaxis]
# T_grid becomes a row 2D vector (shape: 1x13) = array([[ 6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18]])
# imagine a 2D matrix where every row is the same and has values [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
T_grid = T_range[np.newaxis, :]

# When we subtract/add them later, NumPy automatically stretches (broadcasts)
# the 9x1 and 1x13 vectors into a 2D 9x13 grid matrix.

# Calculate required F and X for every coordinate on the grid
# (F_needed and X_needed will both have shape (9, 13))

F_needed = 2 * L_grid - T_grid
#array([[  2,   1,   0,  -1,  -2,  -3,  -4,  -5,  -6,  -7,  -8,  -9, -10],
#       [  4,   3,   2,   1,   0,  -1,  -2,  -3,  -4,  -5,  -6,  -7,  -8],
#       [  6,   5,   4,   3,   2,   1,   0,  -1,  -2,  -3,  -4,  -5,  -6],
#       [  8,   7,   6,   5,   4,   3,   2,   1,   0,  -1,  -2,  -3,  -4],
#       [ 10,   9,   8,   7,   6,   5,   4,   3,   2,   1,   0,  -1,  -2],
#       [ 12,  11,  10,   9,   8,   7,   6,   5,   4,   3,   2,   1,   0],
#       [ 14,  13,  12,  11,  10,   9,   8,   7,   6,   5,   4,   3,   2],
#       [ 16,  15,  14,  13,  12,  11,  10,   9,   8,   7,   6,   5,   4],
#       [ 18,  17,  16,  15,  14,  13,  12,  11,  10,   9,   8,   7,   6]])
       
X_needed = T_grid - L_grid
#array([[ 2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14],
#       [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13],
#       [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12],
#       [-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11],
#       [-2, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10],
#       [-3, -2, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9],
#       [-4, -3, -2, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8],
#       [-5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5,  6,  7],
#       [-6, -5, -4, -3, -2, -1,  0,  1,  2,  3,  4,  5,  6]])

# Perform a vectorized lookup against the deck vectors
# For each value F_needed[i, j] (or X_needed[i, j]), check if it exists in f (or x)
# this part requires user input f and x, everything before this np.isin() is always the same
F_valid = np.isin(F_needed, f)
X_valid = np.isin(X_needed, x)

# Combine conditions (logical AND) to get the final solution grid
V = F_valid & X_valid

# V is a (9, 13) boolean matrix where V[i, j] is True if state (L_i, T_j) is solvable
print("Solvable Grid Matrix (V):\n", V.astype(int))
# The (9, 13) matrix:
# [[1 0 0 0 0 0 0 0 0 0 0 0 0]
#  [0 1 1 0 0 0 0 0 0 0 0 0 0]
#  [0 0 1 1 1 0 0 0 0 0 0 0 0]
#  [0 0 0 1 1 1 1 0 0 0 0 0 0]
#  [0 0 0 0 1 1 1 1 1 0 0 0 0]
#  [0 0 0 0 0 0 1 1 1 1 0 0 0]
#  [0 0 0 0 0 0 0 0 1 1 1 0 0]
#  [0 0 0 0 0 0 0 0 0 0 1 1 0]
#  [0 0 0 0 0 0 0 0 0 0 0 0 1]]
```

To sanitize the `F_needed` and `X_needed` matrices to remove values that are mathematically impossible in Yu-Gi-Oh! (i.e. Level/Rank cannot be less than 1, and can't exceed 12/13), you can use **`np.where`** to filter them:

```python
# Enforce Yu-Gi-Oh! limits (substitute invalid values with 0)
F_needed_sanitized = np.where((F_needed >= 1) & (F_needed <= 12), F_needed, 0)
X_needed_sanitized = np.where((X_needed >= 1) & (X_needed <= 13), X_needed, 0)

print("Sanitized F_needed (Fusions 1-12):\n", F_needed_sanitized)
print("Sanitized X_needed (Xyz 1-13):\n", X_needed_sanitized)

F_valid = np.isin(F_needed_sanitized, f)
X_valid = np.isin(X_needed_sanitized, x)

# Combine conditions (logical AND) to get the final solution grid
V = F_valid & X_valid

print("Solvable Grid Matrix (V):\n", V.astype(int))

```
to do our program without for loops, we just need set F_needed_sanitized and X_needed_sanitized, then use np.isin on user input f and x to filter those 2 matrix, that's it, the output is the same as the one above

---

## Part 2: The Banished Monsters Setting (Discrete Convolution)

When monsters are already in the banished zone, you can mix and match previously banished cards with the ones you are currently sending. This changes the pool of available return candidates from a single choice to a set. We can formalize this set-level operation as a **discrete convolution** of indicator vectors.

### 1. Banished State Indicator Vectors
Let the maximum possible Level/Rank in the game be $N$ (e.g. 12). We define the current banished states as binary indicator vectors $\mathbf{b}_F, \mathbf{b}_X \in \{0, 1\}^N$:
*   $\mathbf{b}_F[k] = 1$ if a Fusion of Level $k$ is currently banished, and $0$ otherwise.
*   $\mathbf{b}_X[k] = 1$ if an Xyz of Rank $k$ is currently banished, and $0$ otherwise.

### 2. The State Update (Sending Monsters)
When you activate SEC and send a new Fusion ($F_{send}$) and Xyz ($X_{send}$) to the banished zone, the banished state vectors are updated using standard basis vectors $\mathbf{e}_k$:

$$\begin{aligned}
\mathbf{b}'_F &= \mathbf{b}_F + \mathbf{e}_{F_{send}} \\
\mathbf{b}'_X &= \mathbf{b}_X + \mathbf{e}_{X_{send}}
\end{aligned}$$

### 3. Calculating the Target Levels ($L$) via Convolution
To resolve the card, you return a Fusion of level $i$ (where $\mathbf{b}'_F[i] \ge 1$) and an Xyz of rank $j$ (where $\mathbf{b}'_X[j] \ge 1$). The resulting target level is $L = i + j$.

Mathematically, finding the set of all possible target levels $L$ is equivalent to computing the **discrete convolution** of the updated banished indicator vectors:

$$\mathbf{l} = \mathbf{b}'_F * \mathbf{b}'_X$$

Where the $k$-th element of the output vector $\mathbf{l}$ is defined as:
$$\mathbf{l}[k] = \sum_{i} \mathbf{b}'_F[i] \cdot \mathbf{b}'_X[k - i]$$

*   **Interpretation:** The element $\mathbf{l}[k]$ tells you the number of distinct ways you can return a Fusion and Xyz to match an opponent's monster of level $k$.
*   If $\mathbf{l}[k] \ge 1$, then level $k$ is a **valid target level** for the current card total.

### 4. Convolution as a Toeplitz Matrix Operation
We can rewrite this discrete convolution as a formal matrix-vector multiplication by representing the Fusion vector $\mathbf{b}'_F$ as a **Toeplitz Matrix** $\mathbf{M}(\mathbf{b}'_F) \in \{0,1\}^{(2N) \times N}$:

$$\mathbf{l} = \mathbf{M}(\mathbf{b}'_F) \mathbf{b}'_X$$

$$\begin{bmatrix}
\mathbf{l}[2] \\
\mathbf{l}[3] \\
\mathbf{l}[4] \\
\vdots \\
\mathbf{l}[2N]
\end{bmatrix} = \begin{bmatrix}
\mathbf{b}'_F[1] & 0 & 0 & \dots & 0 \\
\mathbf{b}'_F[2] & \mathbf{b}'_F[1] & 0 & \dots & 0 \\
\mathbf{b}'_F[3] & \mathbf{b}'_F[2] & \mathbf{b}'_F[1] & \dots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \dots & \mathbf{b}'_F[N]
\end{bmatrix} \begin{bmatrix}
\mathbf{b}'_X[1] \\
\mathbf{b}'_X[2] \\
\mathbf{b}'_X[3] \\
\vdots \\
\mathbf{b}'_X[N]
\end{bmatrix}$$

The non-zero indices of the output vector $\mathbf{l}$ correspond precisely to the solvable opponent levels $L$ for the given send action.

### Python Implementation (Vectorized)
```python
import numpy as np
from scipy.linalg import toeplitz

# Maximum possible monster Level/Rank in game
N = 12

# Indicator vectors for banished zone (1-indexed representation: size N + 1)
# Initial state: Level 4 Fusion and Rank 4 Xyz are banished
b_F = np.zeros(N + 1)
b_X = np.zeros(N + 1)
b_F[4] = 1
b_X[4] = 1

# Activate SEC and send: Level 5 Fusion, Rank 2 Xyz
F_send = 5
X_send = 2

# Update banished status using one-hot indicator vectors
b_F_updated = b_F + np.eye(N + 1)[F_send]
b_X_updated = b_X + np.eye(N + 1)[X_send]

# --- Option A: Compute valid levels via discrete convolution ---
l_conv = np.convolve(b_F_updated, b_X_updated)
valid_levels_conv = np.where(l_conv >= 1)[0]

# --- Option B: Compute valid levels via Toeplitz Matrix multiplication ---
# Prepare the first column (padded to 2N + 1 to contain the full convolution range)
first_col = np.zeros(2 * N + 1)
first_col[:N + 1] = b_F_updated

# Prepare the first row of the Toeplitz matrix
first_row = np.zeros(N + 1)
first_row[0] = b_F_updated[0]

# Construct the Toeplitz matrix and multiply
M_F = toeplitz(first_col, first_row)
l_matrix = M_F @ b_X_updated
valid_levels_matrix = np.where(l_matrix >= 1)[0]

print("Valid Opponent Levels (Convolution):", valid_levels_conv)
print("Valid Opponent Levels (Toeplitz Matrix):", valid_levels_matrix)
```
