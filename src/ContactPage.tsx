import { useForm, FieldError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from './ValidationError';
type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const navigate = useNavigate();

  function onSubmit(contact: Contact) {
    console.log('submitted', contact);
    navigate(`/thank-you/${contact.name}`);
  }
  //   function handleSubmit(e: FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const contact = {
  //       name: formData.get('name'),
  //       email: formData.get('email'),
  //       reason: formData.get('reason'),
  //       notes: formData.get('notes'),
  //     };
  //     console.log('submit details', contact);
  //   }
  const fieldStyle = 'flex flex-col mb-2';
  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border-red-500' : '';
  }
  return (
    <div
      className="flex flex-col py-10 max-w-md 
    mx-auto"
    >
      <h2
        className="text-3xl font-bold underline 
    mb-3"
      >
        Contact Us
      </h2>
      <p className="mb-3">If you enter your details we'll get back to you as soon as we can.</p>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'you must enter you name',
            })}
            className={getEditorStyle(errors.name)}
          />
          <ValidationError fieldError={errors.name} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Your email address</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'you must enter you email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'email is invalid',
              },
            })}
            className={getEditorStyle(errors.email)}
          />
          <ValidationError fieldError={errors.email} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="reason">Reason you need to contact us</label>
          <select
            id="reason"
            {...register('reason', {
              required: 'you must enter you reason WHY',
            })}
            className={getEditorStyle(errors.reason)}
          >
            <option value=""></option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          <ValidationError fieldError={errors.reason} />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="notes">Additional notes</label>
          <textarea id="notes" {...register('notes')} />
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 h-10 px-6 font-semibold bg-black 
 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// export async function contactPageAction({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const contact = {
//     name: formData.get('name'),
//     email: formData.get('email'),
//     reason: formData.get('reason'),
//     notes: formData.get('notes'),
//   } as Contact;
//   console.log('submit details', contact);
//   return redirect(`/thank-you/${formData.get('name')}`);
// }
