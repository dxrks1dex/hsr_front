import { Dispatch, SetStateAction, useRef, useState } from "react";
import { deleteSynergy, updateSynergy } from "@/fetch/synergy/synergy";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import { ISynergy } from "@/types/interface";
import styled from "styled-components";
import { GlobalButton, GlobalInput } from "@/components/styled/userStyles";

interface Props {
  synergy: ISynergy;
  setIsUpdateSynergyFormOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

export const UpdateSynergy = ({
  synergy,
  setIsUpdateSynergyFormOpen,
  refetch,
}: Props) => {
  const [url, setUrl] = useState(synergy.url);
  const [name, setName] = useState(synergy.name);
  const [cost, setCost] = useState(synergy.cost);
  const [message, setMessage] = useState("");

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsUpdateSynergyFormOpen });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!synergy._id) {
      return;
    }

    const result = await updateSynergy(synergy._id, { url, name, cost });
    if (result) {
      setMessage("Связка успешно обновлена");
      refetch();
    } else {
      setMessage("Ошибка при обновлении связки");
    }
  };

  const onDeleteSynergy = async () => {
    if (!synergy._id) {
      return;
    }

    const result = await deleteSynergy(synergy._id);

    if (result) {
      refetch();
    }
  };

  return (
    <div ref={wrapperRef}>
      <h2>Обновить связку</h2>
      <StyledUpdateSynergyForm onSubmit={handleSubmit}>
        <GlobalInput
          team={1}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          required
        />
        <GlobalInput
          team={1}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название"
          required
        />
        <GlobalInput
          team={1}
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          placeholder="Стоимость"
          required
        />
        <GlobalButton type="submit">Обновить связку</GlobalButton>
        <StyledDeleteSynergyButton onClick={onDeleteSynergy}>
          удалить
        </StyledDeleteSynergyButton>
      </StyledUpdateSynergyForm>
      {message && <p>{message}</p>}
    </div>
  );
};

const StyledUpdateSynergyForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledDeleteSynergyButton = styled(GlobalButton)`
  background-color: #ff4f3b;
`;
