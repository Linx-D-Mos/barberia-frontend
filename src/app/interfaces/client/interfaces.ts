export interface Profile {
    success: number;
    message: string;
    data:    Data;
}

export interface Data {
    id:            number;
    user_id:       number;
    role_id:       number;
    barbershop_id: number | null;
    status:        string;
    created_at:    Date;
    updated_at:    Date;
    user:          User;
    role:          Role;
    barbershop:    Barbershop | null;
}

export interface Barbershop {
    id:         number;
    name:       string;
    address:    string;
    phone:      string;
    owner_id:   string;
    status:     string;
    created_at: Date;
    updated_at: Date;
    schedules:  Schedule[];
}
export interface Schedule {
    id:            number;
    barbershop_id: number;
    day:           string;
    start_time:    string;
    end_time:      string;
    is_available:  number;
    created_at:    Date;
    updated_at:    Date;
}

export interface Role {
    id:         number;
    name:       string;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    phone:             string;
    photo:             string;
    email_verified_at: Date;
    created_at:        Date;
    updated_at:        Date;
}


export interface ServicesClient {
    success:  number;
    message:  string;
    services: Service[];
}

export interface Service {
    id:            number;
    barbershop_id: number;
    name:          string;
    description:   string;
    duration:      number;
    price:         string;
    created_at:    Date;
    updated_at:    Date;
}
