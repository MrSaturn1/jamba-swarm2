import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base" prefetch={false}>
        <Image
          src="/images/swarms-logo-wb.svg"
          alt="Custom Icon"
          width={50}
          height={50}
        />
        <span>Multi-Agent Task Dashboard</span>
      </Link>
    </header>
  );
};

export default Header;