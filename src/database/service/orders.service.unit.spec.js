import { buildOrders, buildUser } from "test/builders";
import {Order} from "@/database/models/order.model";
import { listOrders } from "@/database/service/orders.service";

jest.mock('@/database/models/order.model')
JSON.parse = jest.fn()

describe('Service > Order', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it("should return a list of orders", async () => {
    const user = buildUser()
    const where = {
      userid: user.id,
    }

    const orders = buildOrders().map(order => {
      order.products = JSON.stringify(order.products);
      return order;
    })

    jest.spyOn(Order, 'findAll').mockResolvedValueOnce(orders)

    const returnedOrders = await listOrders(user.id)
    
    expect(returnedOrders).toEqual(orders)
    expect(Order.findAll).toHaveBeenCalledTimes(1)
    expect(Order.findAll).toHaveBeenCalledWith({where})
    expect(JSON.parse).toHaveBeenCalledTimes(3)
  });
})
