import * as Yup from "yup";
import { adduserFormValidationSchema } from "../../common/form-validation";

describe("adduserFormValidationSchema", () => {
  const validateField = async (field: string, value: any) => {
    try {
      await adduserFormValidationSchema.validateAt(field, { [field]: value });
      return true;
    } catch (error) {
      return (error as Yup.ValidationError).message;
    }
  };

  describe("firstName validation", () => {
    it("should reject when firstName is empty", async () => {
      const result = await validateField("firstName", "");
      expect(result).toBe("First Name must be at least 4 characters");
    });

    it("should reject when firstName is too short", async () => {
      const result = await validateField("firstName", "abc");
      expect(result).toBe("First Name must be at least 4 characters");
    });

    it("should accept valid firstName", async () => {
      const result = await validateField("firstName", "John");
      expect(result).toBe(true);
    });
  });

  describe("lastName validation", () => {
    it("should reject when lastName is empty", async () => {
      const result = await validateField("lastName", "");
      expect(result).toBe("Last Name must be at least 4 characters");
    });

    it("should reject when lastName is too short", async () => {
      const result = await validateField("lastName", "Doe");
      expect(result).toBe("Last Name must be at least 4 characters");
    });

    it("should accept valid lastName", async () => {
      const result = await validateField("lastName", "Smith");
      expect(result).toBe(true);
    });
  });

  describe("phone validation", () => {
    it("should reject when phone is empty", async () => {
      const result = await validateField("phone", "");
      expect(result).toBe("Phone is required");
    });

    it("should accept any non-empty phone value", async () => {
      const result = await validateField("phone", "1234567890");
      expect(result).toBe(true);
    });
  });

  describe("username validation", () => {
    it("should reject when username is too short", async () => {
      const result = await validateField("username", "usr");
      expect(result).toBe("Username must be at least 4 characters");
    });

    it("should reject when username contains uppercase letters", async () => {
      const result = await validateField("username", "User");
      expect(result).toBe("Username must contain only lowercase letters");
    });

    it("should reject when username contains numbers", async () => {
      const result = await validateField("username", "user1");
      expect(result).toBe("Username must contain only lowercase letters");
    });

    it("should reject when username contains special characters", async () => {
      const result = await validateField("username", "user@");
      expect(result).toBe("Username must contain only lowercase letters");
    });

    it("should accept valid username", async () => {
      const result = await validateField("username", "validuser");
      expect(result).toBe(true);
    });
  });

  describe("email validation", () => {
    it("should reject when email is empty", async () => {
      const result = await validateField("email", "");
      expect(result).toBe("Email is required");
    });

    it("should accept valid email", async () => {
      const validEmails = [
        "user@example.com",
        "first.last@example.co.uk",
        "user+tag@example.org",
        "user.name@example.travel",
      ];

      for (const email of validEmails) {
        const result = await validateField("email", email);
        expect(result).toBe(true);
      }
    });
  });
  describe("password validation", () => {
    it("should reject when password is too short", async () => {
      const result = await validateField("password", "12345");
      expect(result).toBe("Password must be at least 6 characters");
    });

    it("should reject when password has no special characters", async () => {
      const result = await validateField("password", "password123");
      expect(result).toBe(
        "Password must contain at least one special character",
      );
    });

    it("should accept valid password", async () => {
      const validPasswords = ["pass@123", "123456!", "abcde#"];
      for (const password of validPasswords) {
        const result = await validateField("password", password);
        expect(result).toBe(true);
      }
    });
  });

  describe("confirmPassword validation", () => {
    it("should reject when confirmPassword doesn't match password", async () => {
      const result = await adduserFormValidationSchema
        .validate({
          password: "pass@123",
          confirmPassword: "different",
        })
        .catch((err) => err.message);
      expect(result).toBe("Passwords must match");
    });
  });

  describe("full schema validation", () => {
    it("should validate a complete valid form", async () => {
      const validData = {
        firstName: "John",
        lastName: "Smith",
        phone: "1234567890",
        username: "johnsmith",
        email: "john@example.com",
        password: "pass@123",
        confirmPassword: "pass@123",
      };

      await expect(
        adduserFormValidationSchema.validate(validData),
      ).resolves.toBeTruthy();
    });

    it("should reject incomplete form", async () => {
      const invalidData = {
        firstName: "John",
        phone: "1234567890",
        username: "johnsmith",
        email: "john@example.com",
        password: "pass@123",
        confirmPassword: "pass@123",
      };

      await expect(
        adduserFormValidationSchema.validate(invalidData),
      ).rejects.toThrow();
    });
  });
});
