import { ImSpinner2 } from 'react-icons/im';

export default function ViewerLoading() {
    return (
        <div className="container mx-auto mt-24">
            <div className="flex items-center justify-center">
                <ImSpinner2 className="w-8 h-8 fill-[#3571fe] animate-spin" />
            </div>
        </div>
    );
}