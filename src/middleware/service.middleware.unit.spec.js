import { get } from "@/middleware/service.middleware";

describe('Middleware > Service', () => {
  it("should add service to request", () => {
    const req = {}
    const next = jest.fn().mockName('next')
    get(req, null, next)
    
    expect(req.service).toBeDefined()
    expect(next).toBeCalledTimes(1)
    expect(next).toHaveBeenCalledWith(/* nothing */)
  });
})
