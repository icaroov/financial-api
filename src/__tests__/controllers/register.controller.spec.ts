import { Request, Response } from "express"
import { ZodError } from "zod"

import { RegisterController } from "@/controllers/register.controller"

let registerController: RegisterController

describe("RegisterController", () => {
  beforeEach(() => {
    registerController = new RegisterController()
  })

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response

  it("should throw an error if the CPF format is invalid", async () => {
    const req = {
      body: {
        name: "John Doe",
        document: "123.456.78900",
        password: "123456",
      },
    } as Request

    const handler = registerController.create(req, res)

    await expect(() => handler).rejects.toBeInstanceOf(ZodError)
    expect(() => handler).rejects.toThrow(
      "Invalid document format, must be a CPF (XXX.XXX.XXX-XX) or CNPJ (XX.XXX.XXX/XXXX-XX)"
    )
  })

  it("should throw an error if the CNPJ format is invalid", async () => {
    const req = {
      body: {
        name: "John Doe",
        document: "13.456.789/000100",
        password: "123456",
      },
    } as Request

    const handler = registerController.create(req, res)

    await expect(() => handler).rejects.toBeInstanceOf(ZodError)
    expect(() => handler).rejects.toThrow(
      "Invalid document format, must be a CPF (XXX.XXX.XXX-XX) or CNPJ (XX.XXX.XXX/XXXX-XX)"
    )
  })

  it("should throw an error if the password is invalid", async () => {
    const req = {
      body: {
        name: "John Doe",
        document: "123.456.789-00",
        password: "123",
      },
    } as Request

    const handler = registerController.create(req, res)

    await expect(() => handler).rejects.toBeInstanceOf(ZodError)
    expect(() => handler).rejects.toThrow(
      "String must contain at least 6 character(s)"
    )
  })

  it("should throw an error if the name is invalid", async () => {
    const req = {
      body: {
        name: "Jo",
        document: "123.456.789-00",
        password: "123456",
      },
    } as Request

    const handler = registerController.create(req, res)

    await expect(() => handler).rejects.toBeInstanceOf(ZodError)
    expect(() => handler).rejects.toThrow(
      "String must contain at least 3 character(s)"
    )
  })
})
