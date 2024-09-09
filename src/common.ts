import { Address, Bytes, ethereum } from "@graphprotocol/graph-ts";

interface EventParams {
    _from: Address;
}

// Define the generic event interface
interface GenericEvent {
    receipt: ethereum.TransactionReceipt | null;
    params: EventParams;
}

export function extractSmartAccountAddress<T extends GenericEvent>(event: T): Address {
    let senderAddr = event.params._from;
    if(!event.receipt){
        return senderAddr
    }
    let logs = event.receipt!.logs; // Logs from the transaction receipt
    for (let i = 0; i < logs.length; i++) {
        // Entry point address
        if (
            logs[i].address == Address.fromHexString("0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789") &&
            logs[i].topics.length === 2
        ) {
            // Parse the specific log that contains the sender
            let senderAddress = Address.fromBytes(Bytes.fromUint8Array(logs[i].topics[1].subarray(12, 32)));
            senderAddr = senderAddress;
            break;
        }
    }
    return senderAddr; // Fallback if no EntryPoint is detected
}
