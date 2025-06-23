import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../order_items/entities/order_item.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Shipment } from '../shipments/entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) // Inyección de dependencias , debemos importar el repositorio de la entidad
    private readonly orderRepository: Repository<Order>, // Inyección de dependencias
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>, // Inyección de dependencias
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, // Inyección de dependencias
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>, // Inyección de dependencias
    private readonly productsService: ProductsService,
  ) {
    this.orderRepository = orderRepository;
    this.orderItemRepository = orderItemRepository;
    this.paymentRepository = paymentRepository;
    this.shipmentRepository = shipmentRepository; // Inicialización de las propiedades
    this.productsService = productsService;
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const orderItemsEntities: OrderItem[] = [];
      let totalAmount = 0;

      for (const item of createOrderDto.orderItems) {
        const product = await this.productsService.findOne(item.productId);
        if (!product) {
          throw new NotFoundException('Product with id ' + item.productId + ' not found');
        }

        const itemTotal = product.priceUnit * item.quantity;
        totalAmount += itemTotal;

        const orderItem = this.orderItemRepository.create({
          quantity: item.quantity,
          price: product.priceUnit,
          totalAmount: itemTotal,
          product: product,
        });

        orderItemsEntities.push(orderItem);
      }
      // Crear y guardar la orden
      const order = this.orderRepository.create({
        user: { id: createOrderDto.userId },
        status: createOrderDto.status,
        shippedDate: createOrderDto.shippedDate,
        totalAmount,
      });

      await this.orderRepository.save(order);

      // Asignar la orden a cada ítem
      for (const item of orderItemsEntities) {
        item.order = order;
      }

      // Guardar los ítems
      await this.orderItemRepository.save(orderItemsEntities);

      return order;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear la orden');
    }
  }


  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['orderItems', 'user'],
    });
    return orders
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
