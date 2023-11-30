"use client"
import { Button, Toast } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { HiCheck, HiExclamation} from 'react-icons/hi';
import { useState } from 'react';
import PageFooter from '../../ui/footer';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
}
export default function Page() {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm<FormInputs>();
    
    const onSubmit = async (data:any) => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      emailjs.send(serviceId, 'template_mi100r1', data, publicKey)
      .then(() => {
          setShowToastSuccess(true)
      }, () => {
          setShowToastError(true)
      });
    };

    // toast logic
    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastError, setShowToastError] = useState(false);

    return (
      <div className="bg-black w-full h-full overflow-y-scroll">
          { showToastSuccess &&
              <Toast className="absolute bottom-10 left-10">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Message sent successfully.</div>
                <div className="ml-auto flex items-center space-x-2">
                  <a
                    onClick={() => {reset()}}
                    className="rounded-lg p-1.5 text-sm font-medium text-cyan-600 hover:bg-cyan-100 dark:text-cyan-500 dark:hover:bg-gray-700"
                  >
                    Reset Form
                  </a>
                  <Toast.Toggle onDismiss={() => setShowToastSuccess(false)}/>
                </div>
              </Toast>
          }
          { showToastError &&
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                  <HiExclamation className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">Message failed to send.</div>
                <div className="ml-auto flex items-center space-x-2">
                  <a
                    onClick={() => {reset()}}
                    className="rounded-lg p-1.5 text-sm font-medium text-cyan-600 hover:bg-cyan-100 dark:text-cyan-500 dark:hover:bg-gray-700"
                  >
                    Reset Form
                  </a>
                  <Toast.Toggle onDismiss={() => setShowToastError(false)}/>
                </div>
              </Toast>
          }

          <div className='w-full h-full'>
                <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate className='w-full h-full flex flex-col justify-center items-center'>
                  <div className='w-[50%] flex flex-col justify-center'>
                    <div className='w-full mb-4'>
                      <input
                        type='text'
                        {...register('name', {
                          required: { value: true, message: 'Please enter your name' },
                          maxLength: {
                            value: 30,
                            message: 'Please use 30 characters or less'
                          }
                        })}
                        className='w-full bg-slate-300'
                        placeholder='Name'
                      ></input>
                      {errors.name && <span className='text-red-400'>{errors.name.message}</span>}
                    </div>
                    <div className='w-full mb-4'>
                      <input
                        type='email'
                        {...register('email', {
                          required: true,
                          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        })}
                        className='w-full  bg-slate-300'
                        placeholder='Email address'
                      ></input>
                      {errors.email && (
                        <span className='text-red-400'>Please enter a valid email address</span>
                      )}
                    </div>
                  </div>
                  <div className='w-[50%] flex flex-col justify-center'>
                    <div className='w-full mb-4'>
                      <input
                        type='text'
                        {...register('subject', {
                          required: { value: true, message: 'Please enter a subject' },
                          maxLength: {
                            value: 75,
                            message: 'Subject cannot exceed 75 characters'
                          }
                        })}
                        className='w-full  bg-slate-300'
                        placeholder='Subject'
                      ></input>
                      {errors.subject && (
                        <span className='text-red-400'>{errors.subject.message}</span>
                      )}
                    </div>
                  </div>
                  <div className='w-[50%] flex flex-col justify-center'>
                    <div className='w-full mb-4'>
                      <textarea
                        rows={3}
                        {...register('message', {
                          required: true
                        })}
                        className='w-full  bg-slate-300'
                        placeholder='Message'
                      ></textarea>
                      {errors.message && <span className='text-red-400'>Please enter a message</span>}
                    </div>
                  </div>
                  <Button className="m-4" type='submit'>
                    Submit
                  </Button>
                </form>
            </div>
            <PageFooter/>
          </div>
    );
  }