import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { createSynergy } from "@/fetch/synergy/synergy";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import { useQueryClient } from "react-query";
import { GlobalButton, GlobalInput } from "@/components/styled/userStyles";
import styled from "styled-components";

interface Props {
  setIsAddNewSynergy: Dispatch<SetStateAction<boolean>>;
}

export const SynergyForm = ({ setIsAddNewSynergy }: Props) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const queryClient = useQueryClient();

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsAddNewSynergy });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSynergy({ url, name, cost });
    queryClient.refetchQueries("synergy");
  };

  return (
    <StyledAddSynergyForm onSubmit={handleSubmit} ref={wrapperRef}>
      <GlobalInput
        team={1}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Image URL"
        required
      />
      <GlobalInput
        team={1}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <GlobalInput
        team={1}
        type="number"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        placeholder="Cost"
        required
      />
      <GlobalButton type="submit">Add synergy</GlobalButton>
    </StyledAddSynergyForm>
  );
};

const StyledAddSynergyForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
