function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Очікував ${expected}, отримав ${actual}`);
      }
    },
  };
}

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}\n   ${error.message}`);
  }
}

// ==========================================
// 1. Функція getAgeCategory(age)
// ==========================================
function getAgeCategory(age) {
  if (typeof age !== "number" || Number.isNaN(age) || age < 0) {
    return "некоректний вік";
  }
  if (age <= 12) {
    return "дитина";
  }
  if (age <= 17) {
    return "підліток";
  }
  if (age <= 64) {
    return "дорослий";
  }
  return "пенсіонер";
}

console.log("--- Тести для getAgeCategory ---");

test("getAgeCategory(0) повертає 'дитина' для нижньої межі 0 років", () => {
  expect(getAgeCategory(0)).toBe("дитина");
});

test("getAgeCategory(12) повертає 'дитина' на верхній межі дитячого віку (12)", () => {
  expect(getAgeCategory(12)).toBe("дитина");
});

test("getAgeCategory(13) повертає 'підліток' на нижній межі підліткового віку (13)", () => {
  expect(getAgeCategory(13)).toBe("підліток");
});

test("getAgeCategory(17) повертає 'підліток' на верхній межі підліткового віку (17)", () => {
  expect(getAgeCategory(17)).toBe("підліток");
});

test("getAgeCategory(18) повертає 'дорослий' на нижній межі дорослого віку (18)", () => {
  expect(getAgeCategory(18)).toBe("дорослий");
});

test("getAgeCategory(64) повертає 'дорослий' на верхній межі дорослого віку (64)", () => {
  expect(getAgeCategory(64)).toBe("дорослий");
});

test("getAgeCategory(65) повертає 'пенсіонер' на нижній межі пенсійного віку (65)", () => {
  expect(getAgeCategory(65)).toBe("пенсіонер");
});

test("getAgeCategory(-5) повертає 'некоректний вік' для від'ємного числа", () => {
  expect(getAgeCategory(-5)).toBe("некоректний вік");
});

test("getAgeCategory(NaN) повертає 'некоректний вік' для значення NaN", () => {
  expect(getAgeCategory(NaN)).toBe("некоректний вік");
});

test("getAgeCategory('25') повертає 'некоректний вік' якщо передано рядок (не число)", () => {
  expect(getAgeCategory("25")).toBe("некоректний вік");
});

// ==========================================
// 2. Функція calculateTotal(price, quantity, discount = 0)
// ==========================================
function calculateTotal(price, quantity, discount = 0) {
  if (
    typeof price !== "number" ||
    typeof quantity !== "number" ||
    typeof discount !== "number" ||
    Number.isNaN(price) ||
    Number.isNaN(quantity) ||
    Number.isNaN(discount) ||
    price < 0 ||
    quantity < 0 ||
    discount < 0 ||
    discount > 100
  ) {
    return null;
  }

  const total = price * quantity;
  return total - (total * discount) / 100;
}

console.log("\n--- Тести для calculateTotal ---");

// 8 тестів при мінімумі 6 (усі обов'язкові кейси з умови)
test("calculateTotal(100, 3) без передачі знижки повертає 300", () => {
  expect(calculateTotal(100, 3)).toBe(300);
});

test("calculateTotal(100, 3, 10) зі знижкою 10% повертає 270", () => {
  expect(calculateTotal(100, 3, 10)).toBe(270);
});

test("calculateTotal(150, 2, 0) з явною знижкою 0% повертає 300", () => {
  expect(calculateTotal(150, 2, 0)).toBe(300);
});

test("calculateTotal(200, 4, 100) зі знижкою 100% повертає 0", () => {
  expect(calculateTotal(200, 4, 100)).toBe(0);
});

test("calculateTotal(500, 0, 20) при кількості товару 0 повертає 0", () => {
  expect(calculateTotal(500, 0, 20)).toBe(0);
});

test("calculateTotal(-100, 2, 10) з від'ємною ціною повертає null", () => {
  expect(calculateTotal(-100, 2, 10)).toBe(null);
});

test("calculateTotal(100, -2, 10) з від'ємною кількістю повертає null", () => {
  expect(calculateTotal(100, -2, 10)).toBe(null);
});

test("calculateTotal(100, 2, 120) зі знижкою більше 100% повертає null", () => {
  expect(calculateTotal(100, 2, 120)).toBe(null);
});
