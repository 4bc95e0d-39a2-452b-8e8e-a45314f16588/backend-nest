import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@orders/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '@orders/dto/create.order.dto';
import { UpdateOrderDto } from '@orders/dto/update.order.dto';
@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) 
        private ordersRepository: Repository<Order>
    ) {}

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    async findOne(id: string): Promise<Order | null> {
        return this.ordersRepository.findOneBy({ id });
    }

    async findOneByOrderId(id: string): Promise<Order | null> {
        return this.ordersRepository.findOneBy({ orderId: id });
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersRepository.save(createOrderDto);
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<void> {
        await this.ordersRepository.update(id, updateOrderDto);
    }

    async remove(id: string): Promise<void> {
        await this.ordersRepository.delete(id);
    }

}
