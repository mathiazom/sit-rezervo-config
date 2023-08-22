import { Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import Agenda from "./Agenda";
import { RezervoClass, UserConfig } from "../../../types/rezervo";
import { classConfigRecurrentId, classRecurrentId } from "../../../lib/integration/common";

const AgendaModal = ({
    open,
    setOpen,
    userConfig,
    classes,
    selectedClassIds,
    onInfo,
    onSelectedChanged,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    userConfig: UserConfig | undefined;
    classes: RezervoClass[];
    selectedClassIds: string[] | null;
    onInfo: Dispatch<SetStateAction<RezervoClass | null>>;
    onSelectedChanged: (classId: string, selected: boolean) => void;
}) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <>
                {userConfig?.classes && (
                    <Agenda
                        agendaClasses={userConfig.classes.map((c) => ({
                            config: c,
                            _class: classes.find((sc) => classRecurrentId(sc) === classConfigRecurrentId(c)),
                            markedForDeletion:
                                selectedClassIds != null && !selectedClassIds.includes(classConfigRecurrentId(c)),
                        }))}
                        onInfo={onInfo}
                        onSetToDelete={(c, toDelete) => onSelectedChanged(classConfigRecurrentId(c), !toDelete)}
                    />
                )}
            </>
        </Modal>
    );
};

export default AgendaModal;
