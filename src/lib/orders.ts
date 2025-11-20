import { supabase } from './supabaseClient';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
}

export interface Order {
  id?: string;
  date?: string;
  status?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  payment_method?: string;
  payment_status?: string;
  delivery_date?: string | null;
  tracking_number?: string | null;
  notes?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export async function createOrder(order: Order, items: OrderItem[]): Promise<{ orderId: string } | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select('id')
    .maybeSingle();
  if (error || !data) return null;
  const orderId = data.id as string;
  const payload = items.map(i => ({ ...i, order_id: orderId }));
  const { error: itemsErr } = await supabase.from('order_items').insert(payload);
  if (itemsErr) return null;
  return { orderId };
}

export async function fetchOrders(limit = 50): Promise<any[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data;
}

export async function fetchOrderItems(orderId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  if (error || !data) return [];
  return data;
}

export async function fetchOrder(orderId: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
  return !error;
}

export async function updateOrderCustomer(
  orderId: string,
  updates: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  }
): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId);
  return !error;
}

export async function fetchOrdersByPhone(phone: string): Promise<any[]> {
  const digits = (phone || '').replace(/\D/g, '');
  const normalized = digits.startsWith('91') ? digits.slice(-10) : digits;
  let { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_phone', normalized)
    .order('date', { ascending: false });
  if (error || !data || data.length === 0) {
    const withCountry = `+91${normalized}`;
    const res2 = await supabase
      .from('orders')
      .select('*')
      .eq('customer_phone', withCountry)
      .order('date', { ascending: false });
    if (!res2.error && res2.data && res2.data.length > 0) {
      data = res2.data;
    } else {
      const res3 = await supabase
        .from('orders')
        .select('*')
        .like('customer_phone', `%${normalized}`)
        .order('date', { ascending: false });
      if (!res3.error && res3.data) data = res3.data;
    }
  }
  return data || [];
}

export async function updateOrderReplacement(orderId: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'Replacement', payment_status: 'Replacement' })
    .eq('id', orderId);
  return !error;
}