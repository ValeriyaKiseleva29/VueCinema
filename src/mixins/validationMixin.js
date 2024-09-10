// дз 7 создание миксина для валидации
export const validationMixin = {
    data() {
        return {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            submitted: false,
        };
    },
    methods: {
        validateFields() {
            let isValid = true;
            if (!this.email || !this.email.includes('@')) {
                this.emailError = 'Введите корректный email.';
                isValid = false;
            } else {
                this.emailError = '';
            }
            if (this.password.length < 5) {
                this.passwordError = 'Пароль должен содержать минимум 5 символов.';
                isValid = false;
            } else {
                this.passwordError = '';
            }

            return isValid; // Возвращаем результат валидации
        }
    }
};
