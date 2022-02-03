import { buildNext, buildOrders, buildReq, buildRes } from "test/builders";
import {index} from './orders.controller';
import * as service from '@/database/service'

jest.mock('@/database/service')

describe('Controllers > Orders', () => {
  it("should return status 200 with a list of orders", async () => { 
    const req = buildReq();
    const res = buildRes()
    const next = buildNext()
    const orders = buildOrders()
    
    jest.spyOn(service, 'listOrders').mockResolvedValueOnce(orders)
    
    await index(req, res, next)
    
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({orders})
    
    expect(service.listOrders).toHaveBeenCalledTimes(1)
    expect(service.listOrders).toHaveBeenCalledWith(req.user.id)
  });

  it("should forward an error when service.listOrder fails", async () => {

  });
  
})
