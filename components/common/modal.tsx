import dynamic from 'next/dynamic'


export const Modal = () => {

 const dynamicModal = dynamic(() => import('@/components/utility/modal'), {
  ssr: false,
 })
 return ( 
  <div>
   
  </div>
 );
}