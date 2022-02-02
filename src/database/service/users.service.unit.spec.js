import { buildError, buildUser } from "test/builders";
import {User } from "@/database/models/user.model";
import { listUsers, saveUser } from "@/database/service/users.service";
import { StatusCodes } from "http-status-codes";
import {logger} from "@/utils";


jest.mock('@/database/models/user.model')
jest.mock('@/utils')

JSON.parse = jest.fn()

describe('Service > User', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it("should return a list of users", async () => {
    const users = [buildUser(), buildUser()]

    jest.spyOn(User, 'findAll').mockResolvedValueOnce(users)

    const returnedUsers = await listUsers()
    
    expect(returnedUsers).toEqual(users)
    expect(User.findAll).toHaveBeenCalledTimes(1)
    expect(User.findAll).toHaveBeenCalledWith(/*nothing*/)
  });

  it("should reject with an error when User.findAll() fails",  () => {
    const error = buildError(StatusCodes.INTERNAL_SERVER_ERROR,`Failed to retrieve users`)

    jest.spyOn(User, 'findAll').mockRejectedValueOnce(error)
    
    expect(listUsers()).rejects.toEqual(error)
  });

  it("should save and return user",  () => {
    const data = {
    email: buildUser().email
    }

    const savedUser = {
      ...data,
      id: 1
    }

    jest.spyOn(User, 'create').mockResolvedValueOnce(savedUser)
    
    expect(saveUser(data)).resolves.toEqual(savedUser)
  });

  it("should reject with an erro when saveUser is executed without any data", () => {
    const error = buildError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to save order')
    
    expect(saveUser()).rejects.toEqual(error)
  });
})
