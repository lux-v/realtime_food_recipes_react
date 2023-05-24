
import * as Yup from 'yup';

export const AccountSettingSchema = Yup.object({
    displayName: Yup.string().required("Display name is required."),
    // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    photoURL: Yup.string(),
})



export const LoginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid e-mail address')
        .required('Email is required'),
    password: Yup.string()
        .min(
            8,
            'Password must be at least 8 characters long'
        )
        .required('Password is required'),
})

export const SignUpSchema = Yup.object({
    name: Yup.string().required("Name is required").max(20, "Max is 20"),
    email: Yup.string()
        .email('Invalid e-mail address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match").required("Confirm password is required")
})


export const PasswordResetSchema = Yup.object({
    email: Yup.string()
        .email('Invalid e-mail address')
        .required('Email is required'),
})


export const AddNewRecipeSchema = Yup.object({
    name: Yup.string()
        .required('Recipe name is required')
        .max(60, 'Recipe name must be less than 60 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(30, 'Description must be at least 30 characters')
        .max(1500, 'Description must be less than 1500 characters'),
    ingredients: Yup.array()
        .of(Yup.string()
            .required('Ingredient name is required')
            .max(50, 'Ingredient name must be less than 50 characters')
        )
        .min(1, 'At least one ingredient is required')
        .max(20, 'Maximum number of ingredients is 20'),
    imgUrl: Yup.string()
        .url('Image URL is not valid'),
    cookTimeMin: Yup.number()
        .typeError('The cook time must be a number')
        .min(1, 'Cook time must be at least 1 minute')
        .max(1440, 'Cook time must be less than 1440 minutes (24 hours)').required('Cook time is required'),
    servings: Yup.number().typeError('Servings must be a number')
        .min(1, 'Serving number must be at least 1')
        .max(50, 'Serving number must be less than 50').required('Serving number is required'),
    category: Yup.string(),
    // dietaryRestrictions: Yup.array()
    //     .of(Yup.string()
    //         .required('Dietary restriction is required')
    //     )
    //     .min(1, 'At least one dietary restriction is required')
    //     .max(5, 'Maximum number of dietary restrictions is 5'),
    dietaryRestrictions: Yup.string(),
    cuisine: Yup.string(),
    cookingMethod: Yup.string(),
    newIngredient: Yup.string()
        .max(50, 'New ingredient name must be less than 50 characters'),
    steps: Yup.array()
        .of(Yup.string()
            .required('Step description is required')
            .max(1500, 'Step must be less than 1500 characters')
        )
        .max(20, 'Maximum number of steps is 20'),
})