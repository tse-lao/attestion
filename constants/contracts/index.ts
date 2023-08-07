import { Address } from "viem";
import attestationAbi from "../abi/attestation.json";
import attestationFactoryAbi from "../abi/attestationFactory.json";

export const CONTRACTS = {
  attestionFactory: {
    optimistic: {
        contract: "0xE3822FC46fF629B3cb8e6FF1cCD4AF61Ca8B601d" as Address,
        abi: attestationFactoryAbi,
    }
  },
  attestation: {
    optimistic: {
        contract: "0x229e8bc155A2F9A74f5d56B0D86E022828A9142B" as Address,
        abi: attestationAbi,
    }
},
};
