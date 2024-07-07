export interface IRegisterInput {
  name: "email" | "password" | "username",
  placeholder: string;
  type: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  }
}


export interface ILoginInput {
  name: "identifier" | "password"
  placeholder?: string;
  type: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  }
}
export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  }
}

export interface ITodo {
  id: number;
  title: string;
  createdAt: string;
}
