import { SelectHTMLAttributes } from "react";

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  data: { id: number; name: string; value: string }[];
}
const Select = ({ label, data, name, ...rest }: ISelect) => {
  return (
    <div className={`select__wrapper py-2 w-full`}>
      {label && <p className={`select__label p-3`}>{label}</p>}
      <select
        name={name}
        id={name}
        className={`w-full select py-2 bg-white border-b-[1px] border-primaryBlue text-xs text-primaryBlue md:text-base`}
        {...rest}
      >
        {data.map((menu, index) => (
          <option
            className="select_item bg-white hover:bg-lightBlue w-full"
            key={String(`key: ${index}`)}
            value={menu.value}
          >
            {menu.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
