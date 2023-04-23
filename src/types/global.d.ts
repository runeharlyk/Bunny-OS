/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-comlink/client" />

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclick_outside?: () => void;
		ondragmove?: (e: any) => void;
		onenterViewport?: () => void;
		onlosefocus?: () => void;
		onpan?: (event: any) => void;
		onpressing?: (event: any) => void;
		onpanend?: (event: any) => void;
	}
}
interface Array<T> {
	at(index: number): T | undefined;
}

declare global {
    interface Window { MyNamespace: any; };
	interface Navigator { usb?: usb}
	interface Performance {
		memory?: {
		  /** The maximum size of the heap, in bytes, that is available to the context. */
		  jsHeapSizeLimit: number;
		  /** The total allocated heap size, in bytes. */
		  totalJSHeapSize: number;
		  /** The currently active segment of JS heap, in bytes. */
		  usedJSHeapSize: number;
		}
	}
	interface USBDevice {
		configurations: any;
		configuration: any[]
		productName: string;
		productId: number;
		vendorId: number;
		opened: boolean
		deviceClass: number;
		deviceProtocol: number;
		deviceSubclass: number;
		deviceVersionMajor: number;
		deviceVersionMinor: number;
		deviceVersionSubminor: number;
		manufacturerName: string;
		serialNumber: string;
		usbVersionMajor: number;
		usbVersionMinor: number;
		usbVersionSubminor: number;
	}
	
	interface usb {
		getDevices: () => Promise<USBDevice[]>
		requestDevice: (arg:any) => Promise<USBDevice>
		addEventListener: (event:string, callback) => Promise<USBDevice>
	}
}


export {}