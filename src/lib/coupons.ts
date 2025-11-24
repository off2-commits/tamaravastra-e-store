import { supabase } from './supabaseClient';

export interface Coupon {
    id: string;
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_cart_products: number;
    is_active: boolean;
    created_at: string;
}

export async function fetchCoupons(): Promise<Coupon[]> {
    const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching coupons:', error);
        return [];
    }
    return data || [];
}

export async function createCoupon(coupon: Omit<Coupon, 'id' | 'created_at'>): Promise<Coupon | null> {
    const { data, error } = await supabase
        .from('coupons')
        .insert([coupon])
        .select()
        .single();

    if (error) {
        console.error('Error creating coupon:', error);
        return null;
    }
    return data;
}

export async function deleteCoupon(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting coupon:', error);
        return false;
    }
    return true;
}

export async function verifyCoupon(code: string, cartItemCount: number): Promise<{ valid: boolean; coupon?: Coupon; message?: string }> {
    const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .single();

    if (error || !data) {
        return { valid: false, message: 'Invalid coupon code' };
    }

    if (cartItemCount < (data.min_cart_products || 0)) {
        return { valid: false, message: `Minimum ${data.min_cart_products} items required in cart` };
    }

    return { valid: true, coupon: data };
}
