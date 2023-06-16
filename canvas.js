function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function lerpX(amount, value1 = 300, value2 = 600) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

function lerpY(amount, value1 = 300, value2 = 0) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

function lerpNegativeY(amount, value1 = 300, value2 = 600) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

function lerpNegativeX(amount, value1 = 300, value2 = 0) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

function point(coords) {
  const { x, y } = coords;

  const newX = x < 0 ? lerpNegativeX(Math.abs(x)) : lerpX(x);
  console.log("🚀 ~ file: canvas.js:33 ~ point ~ newX", newX);
  const newY = y < 0 ? lerpNegativeY(Math.abs(y)) : lerpY(y);
  console.log("🚀 ~ file: canvas.js:34 ~ point ~ newY", newY);

  ctx.strokeRect(newX, newY, 2, 2);
}

function getDistanceBetweenPoints(A, B) {
  return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
}

const btn = document.getElementById("rotateX");
let angle = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = 600;
const canvasHeight = 600;
const origin = { x: 0, y: 0 };

point(origin);

btn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  angle += 4;

  function rotateAroundX(coords) {
    // 3D rotation x
    // x = Ax * 1 + A.y * 0 + A.z * 0
    // y = Ax * 0 + A.y * cos(45) + A.z * -sin(45)
    // z = Ax * 0 + A.y * sin(45) + A.z * cos(45)

    const { x, y, z } = coords;

    return {
      x: x * 1 + y * 0 + z * 0,
      y:
        x * 0 +
        y * Math.cos(toRadians(angle)) +
        z * -Math.sin(toRadians(angle)),
      z:
        x * 0 + y * Math.sin(toRadians(angle)) + z * Math.cos(toRadians(angle)),
    };
  }

  // front face
  const A = { x: 0.1, y: 0.1, z: -0.1 };
  const B = { x: -0.1, y: 0.1, z: -0.1 };
  const C = { x: -0.1, y: -0.1, z: -0.1 };
  const D = { x: 0.1, y: -0.1, z: -0.1 };

  // back face
  const E = { x: 0.1, y: 0.1, z: 0.1 };
  const F = { x: -0.1, y: 0.1, z: 0.1 };
  const G = { x: -0.1, y: -0.1, z: 0.1 };
  const H = { x: 0.1, y: -0.1, z: 0.1 };

  // front face
  point(convertFrom3Dto2D(rotateAroundX(A)));
  point(convertFrom3Dto2D(rotateAroundX(B)));
  point(convertFrom3Dto2D(rotateAroundX(C)));
  point(convertFrom3Dto2D(rotateAroundX(D)));

  // back face
  point(convertFrom3Dto2D(rotateAroundX(E)));
  point(convertFrom3Dto2D(rotateAroundX(F)));
  point(convertFrom3Dto2D(rotateAroundX(G)));
  point(convertFrom3Dto2D(rotateAroundX(H)));

  function convertFrom3Dto2D(Point3D) {
    const { x, y, z } = Point3D;

    return {
      x: (x * 2) / (z - 2),
      y: (y * 2) / (z - 2),
      // x: (x * 2) / (z - 2),
      // y: (y * 2) / (z - 2),
    };
  }
});
