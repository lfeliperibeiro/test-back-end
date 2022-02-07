import * as service from '@/database/service';
import { buildError, buildOrders } from "test/builders";
import { buildCall } from "test/builders.integration";
import { StatusCodes } from "http-status-codes";


jest.mock('@/database/service')

describe('Router > Integration > Orders', () => {
  it("should return status 200 and a list of orders", async done => {
    const orders = buildOrders()
    
    jest.spyOn(service, 'listOrders').mockResolvedValueOnce(orders)
   
    const res = await buildCall('/api/order')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ orders })
    
   done();
  });

  it("should return status 500 and an error message when listOrder rejects", async done => {
    const error = buildError(StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to retrieve list of orders')

    jest.spyOn(service, 'listOrders').mockRejectedValueOnce(error)

    const res = await buildCall('/api/order')

    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.body).toEqual({ message: 'Failed to retrieve list of orders' })

    done();
  });
})
