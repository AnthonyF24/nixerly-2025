import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

type AccountType = "professional" | "business" | null;

interface AccountDetails {
  accountType: AccountType;
  businessName?: string;
  isLoading: boolean;
}

export const useAccountType = (): AccountDetails => {
  const { user, isLoaded } = useUser();
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    accountType: null,
    isLoading: true
  });

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.publicMetadata;
      const userAccountType = metadata.accountType as AccountType;
      
      setAccountDetails({
        accountType: userAccountType || null,
        businessName: metadata.businessName as string | undefined,
        isLoading: false
      });
    } else if (isLoaded && !user) {
      setAccountDetails({
        accountType: null,
        isLoading: false
      });
    }
  }, [isLoaded, user]);

  return accountDetails;
};

export default useAccountType; 