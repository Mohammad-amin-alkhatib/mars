import { useForm } from "react-hook-form";
import { toast, Toaster } from 'react-hot-toast';
import styles from './Form.module.scss';
import cx from 'classnames';
import { useState } from "react";

const Form = ({ className }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                toast.success('Message sent successfully! We will contact you soon.', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#4CAF50',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '16px 24px',
                        borderRadius: '8px'
                    },
                    icon: '✉️',
                });
                reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to send message. Please try again.', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#f44336',
                    color: '#fff',
                    fontSize: '16px',
                    padding: '16px 24px',
                    borderRadius: '8px'
                },
                icon: '❌',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={cx(styles.container, className)}>
            <Toaster />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            className={styles.input} 
                            {...register('name', { 
                                required: 'Name is required',
                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })} 
                            placeholder="Your Name" 
                        />
                        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="phoneNumber">Phone</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            className={styles.input}
                            placeholder="+962XXXXXXXXX"
                            {...register('phoneNumber', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^(\+9627\d{8}|07\d{8})$/,
                                    message: 'Please enter a valid phone number (+9627XXXXXXXX or 07XXXXXXXX)',
                                },
                            })}
                        />
                        {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className={styles.input} 
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email address'
                                }
                            })} 
                            placeholder="your@email.com" 
                        />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message"
                            className={styles.input} 
                            rows="5"
                            {...register('message', { 
                                required: 'Message is required',
                                minLength: { value: 10, message: 'Message must be at least 10 characters' }
                            })} 
                            placeholder="Your message here..."
                        />
                        {errors.message && <p className={styles.error}>{errors.message.message}</p>}
                    </div>
                </div>

                <div className={styles.consent}>
                    <input 
                        type="checkbox" 
                        id="consent"
                        className={styles.checkbox} 
                        {...register('consent', { 
                            required: 'Please consent before sending email' 
                        })} 
                    />
                    <label htmlFor="consent">
                        I agree that my data will be collected and stored electronically with our privacy policy to answer my inquiry, 
                        and none of this gathered information will be disclosed with any other party nor published to any other entity.
                    </label>
                </div>
                {errors.consent && <p className={styles.error}>{errors.consent.message}</p>}

                <button 
                    type="submit" 
                    className={cx(styles.submit, {
                        [styles.loading]: isSubmitting
                    })}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default Form;