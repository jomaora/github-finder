import SpinnerImage from './assets/spinner.gif'

const Spinner = () => {
  return (
    <div className='wd-100 mt-20'>
      <img 
        src={SpinnerImage} 
        alt='Loading' 
        width={180} 
      className='text-center mx-auto'/>
    </div>
  )
}

export default Spinner