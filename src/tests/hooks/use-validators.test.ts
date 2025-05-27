import { renderHook, act } from "@testing-library/react";
import moment from "moment";
import useValidators from "../../hooks/use-validators";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

const mockIsEmailExist = jest.fn();
const mockIsUsernameExist = jest.fn();

jest.mock("../../utils/utils", () => ({
  isEmailExist: (email: string) => mockIsEmailExist(email),
  isUsernameExist: (username: string) => mockIsUsernameExist(username),
}));

describe("useValidators", () => {
  beforeEach(() => {
    mockIsEmailExist.mockResolvedValue(false);
    mockIsUsernameExist.mockResolvedValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a validator for each field", () => {
    const { result } = renderHook(() => useValidators());

    expect(result.current.identifierValidator).toBeInstanceOf(Function);
    expect(result.current.nameValidator).toBeInstanceOf(Function);
    expect(result.current.cityValidator).toBeInstanceOf(Function);
    expect(result.current.parentValidator).toBeInstanceOf(Function);
    expect(result.current.creatorValidator).toBeInstanceOf(Function);
    expect(result.current.usernameValidator).toBeInstanceOf(Function);
    expect(result.current.userControllerValidator).toBeInstanceOf(Function);
    expect(result.current.loginValidator).toBeInstanceOf(Function);
    expect(result.current.emailValidator).toBeInstanceOf(Function);
    expect(result.current.firstNameValidator).toBeInstanceOf(Function);
    expect(result.current.lastNameValidator).toBeInstanceOf(Function);
    expect(result.current.passwordValidator).toBeInstanceOf(Function);
    expect(result.current.paswordValidator).toBeInstanceOf(Function);
    expect(result.current.phoneValidator).toBeInstanceOf(Function);
    expect(result.current.paymentMethodValidator).toBeInstanceOf(Function);
    expect(result.current.addressValidator).toBeInstanceOf(Function);
    expect(result.current.countryValidator).toBeInstanceOf(Function);
    expect(result.current.cordonneesGpsValidator).toBeInstanceOf(Function);
    expect(result.current.modeAffectationValidator).toBeInstanceOf(Function);
    expect(result.current.ptsIdValidator).toBeInstanceOf(Function);
    expect(result.current.controllerTypeValidator).toBeInstanceOf(Function);
    expect(result.current.controllerUsernameValidator).toBeInstanceOf(Function);
    expect(result.current.plannedExportDateValidator).toBeInstanceOf(Function);
  });

  describe("useValidators", () => {
    it("should return true for a valid username", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.usernameValidator("validUsername123");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if username is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.usernameValidator("ab");
      });
      expect(error).toBe("validation.username.min");
    });

    it("should return an error message if username already exists", async () => {
      mockIsUsernameExist.mockResolvedValueOnce(true);
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.usernameValidator("existingUser");
      });
      expect(error).toBe("validation.username.exist");
    });

    it("should return an error message if username is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.usernameValidator("");
      });
      expect(error).toBe("validation.username.required");
    });
  });

  describe("emailValidator", () => {
    it("should return true for a valid email", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.emailValidator("test@example.com");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if email is invalid", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.emailValidator("invalid-email");
      });
      expect(error).toBe("validation.email.invalid");
    });

    it("should return an error message if email already exists", async () => {
      mockIsEmailExist.mockResolvedValueOnce(true);
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.emailValidator("existing@example.com");
      });
      expect(error).toBe("validation.email.exist");
    });

    it("should return an error message if email is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.emailValidator("");
      });
      expect(error).toBe("validation.email.required");
    });
  });

  describe("passwordValidator", () => {
    it("should return true for a valid password", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.passwordValidator("StrongP@ssw0rd");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if password is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.passwordValidator("short");
      });
      expect(error).toBe("validation.password.min");
    });

    it("should return an error message if password does not contain a special character", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.passwordValidator("NoSpecialChar123");
      });
      expect(error).toBe("validation.password.matches");
    });

    it("should return an error message if password is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.passwordValidator("");
      });
      expect(error).toBe("validation.password.required");
    });
  });

  describe("plannedExportDateValidator", () => {
    it("should return true for a planned export date in the future", async () => {
      const futureDate = moment().add(1, "day").toDate();
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.plannedExportDateValidator(futureDate);
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if planned export date is in the past", async () => {
      const pastDate = moment().subtract(1, "day").toDate();
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.plannedExportDateValidator(pastDate);
      });
      expect(error).toBe("validation.plannedExportDate.greaterThan");
    });

    it("should return an error message if planned export date is required (null)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.plannedExportDateValidator(null as any);
      });
      expect(error).toBe("validation.plannedExportDate.required");
    });
  });

  describe("nameValidator", () => {
    it("should return true for a valid name", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.nameValidator("Valid Name");
      });
      expect(isValid).toBe(true);
    });

    it("should return true for a name starting with an accented uppercase letter", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.nameValidator("Élève");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if name is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.nameValidator("Na");
      });
      expect(error).toBe("validation.name.min");
    });

    it("should return an error message if name does not start with uppercase or contains trailing spaces", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.nameValidator("invalid name ");
      });
      expect(error).toBe("validation.name.firstLetterUppercaseOrNoSpaces");
    });

    it("should return an error message if name is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.nameValidator("");
      });
      expect(error).toBe("validation.name.required");
    });
  });

  describe("identifierValidator", () => {
    it("should return true for a valid identifier", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.identifierValidator(
          "valid-identifier-123_abc",
        );
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if identifier is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.identifierValidator("short");
      });
      expect(error).toBe("validation.identifier.min");
    });

    it("should return an error message if identifier is too long", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.identifierValidator(
          "thisisareallylongidentifierthatshoulddefinitelyfailthelengthvalidation",
        );
      });
      expect(error).toBe("validation.identifier.max");
    });

    it("should return an error message if identifier has invalid format", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.identifierValidator(
          "invalid!@#identifier",
        );
      });
      expect(error).toBe("validation.identifier.invalidFormat");
    });

    it("should return an error message if identifier is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.identifierValidator("");
      });
      expect(error).toBe("validation.identifier.required");
    });
  });

  describe("cityValidator", () => {
    it("should return true for a valid city", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.cityValidator("New York");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if city is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.cityValidator("Ny");
      });
      expect(error).toBe("validation.city.min");
    });

    it("should return an error message if city is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.cityValidator("");
      });
      expect(error).toBe("validation.city.required");
    });
  });

  describe("firstNameValidator", () => {
    it("should return true for a valid first name", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.firstNameValidator("John");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if first name is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.firstNameValidator("Jo");
      });
      expect(error).toBe("validation.firstName.min");
    });

    it("should return an error message if first name is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.firstNameValidator("");
      });
      expect(error).toBe("validation.firstName.required");
    });
  });

  describe("lastNameValidator", () => {
    it("should return true for a valid last name", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.lastNameValidator("Doe");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if last name is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.lastNameValidator("Do");
      });
      expect(error).toBe("validation.lastName.min");
    });

    it("should return an error message if last name is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.lastNameValidator("");
      });
      expect(error).toBe("validation.lastName.required");
    });
  });

  describe("paswordValidator (note: typo in original code, 'pasword')", () => {
    it("should return true for a valid password (4-10 chars, alphanumeric/underscore)", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.paswordValidator("pass_123");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if password is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.paswordValidator("pas");
      });
      expect(error).toBe("validation.password.miin");
    });

    it("should return an error message if password is too long", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.paswordValidator("superlongpassword");
      });
      expect(error).toBe("validation.password.max");
    });

    it("should return an error message if password contains invalid characters", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.paswordValidator("pass-word!");
      });
      expect(error).toBe("validation.password.matche");
    });

    it("should return an error message if password is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.paswordValidator("");
      });
      expect(error).toBe("validation.password.required");
    });
  });

  describe("phoneValidator", () => {
    it("should return true for a valid phone number", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.phoneValidator("1234567890");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if phone number is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.phoneValidator("12345");
      });
      expect(error).toBe("validation.phone.min");
    });

    it("should return an error message if phone number is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.phoneValidator("");
      });
      expect(error).toBe("validation.phone.required");
    });
  });

  describe("addressValidator", () => {
    it("should return true for a valid address", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.addressValidator("123 Main St, Anytown");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if address is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.addressValidator("123");
      });
      expect(error).toBe("validation.address.min");
    });

    it("should return an error message if address is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.addressValidator("");
      });
      expect(error).toBe("validation.address.required");
    });
  });

  describe("countryValidator", () => {
    it("should return true for a valid country ID", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.countryValidator("1");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if country ID is not positive", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.countryValidator("0");
      });
      expect(error).toBe("validation.countryId.positive");
    });

    it("should return an error message if country ID is required (null)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.countryValidator(null as any);
      });
      expect(error).toBe("validation.countryId.required");
    });
  });

  describe("ptsIdValidator", () => {
    it("should return true for a valid PTS ID", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.ptsIdValidator(
          "abcdef1234567890abcdef12",
        );
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if PTS ID is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.ptsIdValidator("short");
      });
      expect(error).toBe("validation.controllerPtsId.min");
    });

    it("should return an error message if PTS ID has invalid characters or length", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.ptsIdValidator(
          "invalid-pts-id-too-long-or-chars!",
        );
      });
      expect(error).toBe("validation.controllerPtsId.matches");
    });

    it("should return an error message if PTS ID is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.ptsIdValidator("");
      });
      expect(error).toBe("validation.controllerPtsId.required");
    });
  });

  describe("userControllerValidator", () => {
    it("should return an error message if user controller is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.userControllerValidator("ab");
      });
      expect(error).toBe("validation.userController.min");
    });

    it("should return an error message if user controller is too long", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.userControllerValidator(
          "long_controller_name",
        );
      });
      expect(error).toBe("validation.userController.max");
    });

    it("should return an error message if user controller is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.userControllerValidator("");
      });
      expect(error).toBe("validation.userController.required");
    });
  });

  describe("loginValidator", () => {
    it("should return true for a valid login", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.loginValidator("validLogin123");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if login is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.loginValidator("lo");
      });
      expect(error).toBe("validation.login.min");
    });

    it("should return an error message if login already exists", async () => {
      mockIsUsernameExist.mockResolvedValueOnce(true);
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.loginValidator("existingLogin");
      });
      expect(error).toBe("validation.username.exist");
    });

    it("should return an error message if login is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.loginValidator("");
      });
      expect(error).toBe("validation.login.required");
    });
  });

  describe("parentValidator", () => {
    it("should return true for a non-empty parent account ID", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.parentValidator("someParentId");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if parent account ID is empty", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.parentValidator("");
      });
      expect(error).toBe("validation.parentId.required");
    });
  });

  describe("creatorValidator", () => {
    it("should return true for a non-empty creator account ID", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.creatorValidator("someCreatorId");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if creator account ID is empty", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.creatorValidator("");
      });
      expect(error).toBe("validation.creatorAccountId.required");
    });
  });

  describe("paymentMethodValidator", () => {
    it("should return true for a non-empty payment method", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.paymentMethodValidator("Credit Card");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if payment method is empty", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.paymentMethodValidator("");
      });
      expect(error).toBe("validation.paymentMethod.required");
    });
  });

  describe("cordonneesGpsValidator", () => {
    it("should return true for a non-empty GPS coordinates string", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.cordonneesGpsValidator(
          "40.7128, -74.0060",
        );
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if GPS coordinates string is empty", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.cordonneesGpsValidator("");
      });
      expect(error).toBe("validation.cordonneesGps.required");
    });
  });

  describe("modeAffectationValidator", () => {
    it("should return true for a non-empty mode affectation", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.modeAffectationValidator("Manual");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if mode affectation is empty", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.modeAffectationValidator("");
      });
      expect(error).toBe("validation.modeAffectation.required");
    });
  });

  describe("controllerTypeValidator", () => {
    it("should return true for a non-empty controller type", async () => {
      const { result } = renderHook(() => useValidators());
      let isValid;
      await act(async () => {
        isValid = await result.current.controllerTypeValidator("Type A");
      });
      expect(isValid).toBe(true);
    });

    it("should return an error message if controller type is empty", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.controllerTypeValidator("");
      });
      expect(error).toBe("validation.controllerType.required");
    });
  });

  describe("controllerUsernameValidator", () => {
    it("should return an error message if controller username is too short", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.controllerUsernameValidator("mc");
      });
      expect(error).toBe("validation.userController.min");
    });

    it("should return an error message if controller username is too long", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.controllerUsernameValidator(
          "this_is_a_very_long_controller_username",
        );
      });
      expect(error).toBe("validation.userController.max");
    });

    it("should return an error message if controller username contains invalid characters", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.controllerUsernameValidator("user-name!");
      });
      expect(error).toBe("validation.userController.matches");
    });

    it("should return an error message if controller username is required (empty)", async () => {
      const { result } = renderHook(() => useValidators());
      let error;
      await act(async () => {
        error = await result.current.controllerUsernameValidator("");
      });
      expect(error).toBe("validation.userController.required");
    });
  });
});
