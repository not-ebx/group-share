import { FieldError } from "../generated/types"

export const toErrorMap = (errors: FieldError []) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(
        (error) => {
            errorMap[error.field] = error.message;
        }
    );

    return errorMap;

}