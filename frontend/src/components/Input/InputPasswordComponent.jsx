import InputComponent from './InputComponent';

function InputPasswordComponent({ ...props }) {
    return (
        <InputComponent
            {...props}
            type={'password'}
            showPasswordButton={true}
        />
    );
}

export default InputPasswordComponent;
