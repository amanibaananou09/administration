import api from "../../common/api/axios";
import { GeneralUser } from "../../common/AdminModel";
import {
  getUsers,
  addUser,
  userInformation,
  activateUser,
  deactivateUser,
  getUserByUsername,
  getUserByEmail,
  updateUser,
} from "../../common/api/general-user-api";

jest.mock("../../common/api/axios");

describe("User api", () => {
  const mock = api as jest.Mocked<typeof api>;

  it("should fetch users", async () => {
    const users: GeneralUser[] = [
      {
        id: 1,
        username: "johndoe",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "+123456789",
        customerAccountId: "cust123",
        creatorAccountId: "creator1",
        lastConnectionDate: "2025-05-27T10:00:00Z",
      },
    ];
    mock.get.mockResolvedValueOnce({
      data: {
        content: users,
        totalPages: 1,
        totalElements: 1,
        numberOfElements: 1,
        size: 10,
      },
    });

    const result = await getUsers({ name: "John Doe" }, 0, 10, undefined);

    expect(result.content).toEqual(users);

    expect(mock.get).toHaveBeenCalledWith(
      "/user/filter?name=John+Doe&page=0&size=10",
    );
  });

  it("should add a user", async () => {
    const newUser: GeneralUser = {
      id: 2,
      username: "janedoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "+987654321",
      customerAccountId: "cust123",
      creatorAccountId: "creator1",
      lastConnectionDate: "2025-05-27T10:00:00Z",
    };
    mock.post.mockResolvedValueOnce({});

    await expect(addUser(newUser)).resolves.toBeUndefined();
    expect(mock.post).toHaveBeenCalledWith("/user/add", newUser);
  });

  it("should fetch user information", async () => {
    const user: GeneralUser = {
      id: 1,
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "+123456789",
      customerAccountId: "cust123",
      creatorAccountId: "creator1",
      lastConnectionDate: "2025-05-27T10:00:00Z",
    };
    mock.get.mockResolvedValueOnce({ data: user });

    const result = await userInformation(1);
    expect(result).toEqual(user);
    expect(mock.get).toHaveBeenCalledWith("/user/1/info");
  });

  it("should activate a user", async () => {
    mock.post.mockResolvedValueOnce({ data: { success: true } });

    const result = await activateUser(1);
    expect(result).toEqual({ success: true });
    expect(mock.post).toHaveBeenCalledWith("/user/activate/1");
  });

  it("should deactivate a user", async () => {
    mock.post.mockResolvedValueOnce({ data: { success: true } });

    const result = await deactivateUser(1);
    expect(result).toEqual({ success: true });
    expect(mock.post).toHaveBeenCalledWith("/user/deactivate/1");
  });

  it("should fetch user by username", async () => {
    const user: GeneralUser = {
      id: 1,
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "+123456789",
      customerAccountId: "cust123",
      creatorAccountId: "creator1",
      lastConnectionDate: "2025-05-27T10:00:00Z",
    };
    mock.get.mockResolvedValueOnce({ data: user });

    const result = await getUserByUsername("johndoe");
    expect(result).toEqual(user);
    expect(mock.get).toHaveBeenCalledWith("/user/username/johndoe");
  });

  it("should fetch user by email", async () => {
    const user: GeneralUser = {
      id: 1,
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "+123456789",
      customerAccountId: "cust123",
      creatorAccountId: "creator1",
      lastConnectionDate: "2025-05-27T10:00:00Z",
    };
    mock.get.mockResolvedValueOnce({ data: user });

    const result = await getUserByEmail("johndoe@example.com");
    expect(result).toEqual(user);
    expect(mock.get).toHaveBeenCalledWith("/user/email/johndoe@example.com");
  });

  it("should update a user", async () => {
    const updatedUser: GeneralUser = {
      id: 1,
      username: "johndoe",
      firstName: "John",
      lastName: "Smith",
      email: "johndoe@example.com",
      phone: "+123456789",
      customerAccountId: "cust123",
      creatorAccountId: "creator1",
      lastConnectionDate: "2025-05-27T10:00:00Z",
    };
    mock.put.mockResolvedValueOnce({ data: updatedUser });

    const result = await updateUser(updatedUser);
    expect(result).toEqual(updatedUser);
    expect(mock.put).toHaveBeenCalledWith("/user/update", updatedUser);
  });
});
