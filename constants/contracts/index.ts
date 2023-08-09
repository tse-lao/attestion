import { Address } from "viem";
import attestationAbi from "../abi/attestation.json";
import attestationFactoryAbi from "../abi/attestationFactory.json";
import tokenCreatorAbi from "../abi/tokenCreator.json";
import worldcoinAbi from "../abi/worldcoin.json";
//get the chains id from the env
//optmisticTestnet = 420
//base = 84531

export const CONTRACTS = {
  attestionFactory: {
    420: {
      contract: "0xad8BC443766AaA8ffB214fD2F8E1Dc5Cac7F6B0D" as Address,
      abi: attestationFactoryAbi,
    },
    84531: {
      contract: "0xCF0374a618403D2eF29F100fb1fF2Ca16cc3eb95" as Address,
      abi: attestationFactoryAbi,
    },
  },

  attestation: {
    420: {
      contract: "0xe7504d660C81DB4789E1bb2d4A8134d6505f7D04" as Address,
      abi: attestationAbi,
    },
    84531: {
      contract: "0x1CA26139eF51e754326bce8066DD335560E987D5" as Address,
      abi: attestationAbi,
    },
  },
  worldcoin: {
    420: {
      contract: "0x2B4b59510E206894f3F6b28FadBe9138072BA8F7" as Address,
      abi: worldcoinAbi,
    },
    84531: {
      contract: "0x00" as Address,
      abi: worldcoinAbi,
    },
  },

  tokenCreator: {
    420: {
      contract: "0x42408c20A51F4C2068CC4B1fc94A19c7fc18d4F0" as Address,
      abi: tokenCreatorAbi,
    },
    84531: {
      contract: "0x00" as Address,
      abi: tokenCreatorAbi,
    },
  },
};
