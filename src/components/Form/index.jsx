import { useForm } from "react-hook-form";
import styles from './Form.module.scss'
import cx from 'classnames'

const Form = ({ className }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const onSubmit = (data) => {
        fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    console.log(errors)
    return (
        <div className={cx(styles.container, className)}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className={styles.input} {...register('name', { required: 'Name is required' })} placeholder="Name" />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="phoneNumber">Phone</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            className={styles.input}
                            placeholder="+962XXXXXXXXX"
                            {...register('phoneNumber', {
                                required: 'Phone number is required',
                                pattern: {
                                    // value: /^\+962\d{9}$/, just for internal use
                                    value: /^(\+9627\d{8}|07\d{8})$/, // +9627XXXXXXXX or 07XXXXXXXX
                                    message: 'Phone number must be in the format +962XXXXXXXXX',
                                },
                            })}
                        />
                        {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className={styles.input} {...register('email', { required: 'Email is required' })} placeholder="Email" />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea cols={5} type="email" className={styles.input} {...register('message', { required: 'Message is required' })} placeholder="Message" />
                        {errors.message && <p className={styles.error}>{errors.message.message}</p>}
                    </div>
                </div>
                <div className={styles.consent}>
                    <input type="radio" className={styles.checkbox} {...register('consent', { required: 'Please Conset before sendin email' })} />
                    <label htmlFor="consent">I agree that my data will be collected and stored electronically with our privacy policy to answer my inquiry, and none of this gathered information will be disclosed with any other party nor published to any other entity.</label>
                </div>
                {errors.consent && <p className={styles.error}>{errors.consent.message}</p>}
                <button type="submit" className={styles.submit}>Send Message</button>
            </form>
        </div>
    )
}

export default Form