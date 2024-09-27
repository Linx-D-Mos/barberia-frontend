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
    number:     string;
    created_at: Date;
    updated_at: Date;
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
