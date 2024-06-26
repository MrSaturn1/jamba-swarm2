import { FC, FormEvent, ChangeEvent } from 'react';
import Button from "./ui/button";

interface FooterProps {
  appName: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Footer: FC<FooterProps> = ({ appName, onInputChange, onSubmit }) => {
  return (
    <footer className="relative flex items-center justify-center h-16 px-4 border-t shrink-0 md:px-6">
      <form onSubmit={onSubmit} className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <label htmlFor="app-name" className="text-lg font-semibold text-black">Create App:</label>
        <input
          type="text"
          id="app-name"
          value={appName}
          onChange={onInputChange}
          className="border rounded px-2 py-1 text-black"
        />
        <Button type="submit" variant="outline">Submit</Button>
      </form>
    </footer>
  );
};

export default Footer;