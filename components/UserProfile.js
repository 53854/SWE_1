import Link from "next/link";
import Image from 'next/image'; 

export default function UserProfile({ user }) {
    return (
        
        <div className="tracking-tight">
                            <Image class="float-right mt-6" src="/pie-graph-4.png" width={55} height={55}/>

            <div class="pt-6 font-thin text-lg">
                Summary
            </div>

         
        

            <div class="text-sm text-neutral-200">
                Dec, 2022
            </div>
          
            
        </div>
    );
}