declare module "sslcommerz-lts" {

    interface SSLCommerzPayload {
        total_amount: string | number;
        currency: string;
        tran_id: string;
        product_category?: string;
        product_name: string;
        product_profile?: string;
        success_url: string;
        fail_url: string;
        cancel_url: string;
        ipn_url?: string;
        cus_name?: string;
        cus_email?: string;
        cus_add1?: string;
        cus_city?: string;
        cus_postcode?: string;
        cus_country?: string;
        cus_phone?: string;
        shipping_method?: string;
    }

    interface SSLCommerzResponse {
        GatewayPageURL?: string;
        [key: string]: any;
    }

    class SSLCommerzPayment {
        constructor(store_id: string, store_passwd: string, is_live?: boolean);
        init(payload: SSLCommerzPayload): Promise<SSLCommerzResponse>;
    }

    export default SSLCommerzPayment;
}
