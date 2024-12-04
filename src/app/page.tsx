"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";

import { useEffect, useState } from "react";

export interface Patient {
  Name: string;
  MedicalRecordNumber: string;
  MedicalDiagnosis: string;
  NursingDiagnosis: string;
  AttendingPhysician: string;
  HealthHistory: string;
  PhysicalExamination: string;
  TherapeuticAction: string;
}

const tableHeaderItems = [
  {
    key: "Name",
    label: "Nama",
    className: "text-center text-black",
  },
  {
    key: "MedicalRecordNumber",
    label: "No RM",
    className: "text-center text-black",
  },
  {
    key: "MedicalDiagnosis",
    label: "Diagnosa Medis",
    className: "text-center text-black",
  },
  {
    key: "AttendingPhysician",
    label: "Dokter yang merawat",
    className: "text-center text-black",
  },
  {
    key: "actions",
    label: "Aksi",
    className: "text-center text-black w-52",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  useEffect(() => {
    const initializePatients = async () => {
      assignLocalPatients();
      getPatients();
    };
    initializePatients();
  }, []);

  const assignLocalPatients = () => {
    localStorage.clear();
    localStorage.setItem(
      "patients",
      JSON.stringify([
        {
          Name: "John Doe",
          MedicalRecordNumber: "123456",
          MedicalDiagnosis: "Flu",
          NursingDiagnosis: "Dehydration",
          AttendingPhysician: "Dr. Jane Doe",
          HealthHistory: "None",
          PhysicalExamination: "None",
          TherapeuticAction: "IV Fluid",
        },
        {
          Name: "Jane Doe",
          MedicalRecordNumber: "654321",
          MedicalDiagnosis: "Fever",
          NursingDiagnosis: "Dehydration",
          AttendingPhysician: "Dr. John Doe",
          HealthHistory: "None",
          PhysicalExamination: "None",
          TherapeuticAction: "IV Fluid",
        },
      ])
    );
  };

  const getPatients = async () => {
    setIsLoading(true);
    try {
      const response = localStorage.getItem("patients");
      if (response) {
        setPatients(JSON.parse(response));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPatient = () => {
    const patientData: Patient = {
      Name: "",
      MedicalRecordNumber: "",
      MedicalDiagnosis: "",
      NursingDiagnosis: "",
      AttendingPhysician: "",
      HealthHistory: "",
      PhysicalExamination: "",
      TherapeuticAction: "",
    };

    return (
      <>
        <div className="flex items-center w-full">
          <Button color="success" onPress={onOpenAdd} className="text-white">
            Tambah Pasien
          </Button>
        </div>

        <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-black">
                  <h2 className="text-lg font-bold">Tambah Pasien</h2>
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Nama"
                    placeholder="Masukkan nama pasien"
                    onChange={(e) => (patientData.Name = e.target.value)}
                  />
                  <Input
                    label="No RM"
                    placeholder="Masukkan nomor rekam medis pasien"
                    onChange={(e) =>
                      (patientData.MedicalRecordNumber = e.target.value)
                    }
                  />
                  <Input
                    label="Diagnosa Medis"
                    placeholder="Masukkan diagnosa medis pasien"
                    onChange={(e) =>
                      (patientData.MedicalDiagnosis = e.target.value)
                    }
                  />
                  <Input
                    label="Diagnosa Keperawatan"
                    placeholder="Masukkan diagnosa keperawatan pasien"
                    onChange={(e) =>
                      (patientData.NursingDiagnosis = e.target.value)
                    }
                  />
                  <Input
                    label="Dokter yang merawat"
                    placeholder="Masukkan nama dokter yang merawat pasien"
                    onChange={(e) =>
                      (patientData.AttendingPhysician = e.target.value)
                    }
                  />
                  <Input
                    label="Riwayat Kesehatan"
                    placeholder="Masukkan riwayat kesehatan pasien"
                    onChange={(e) =>
                      (patientData.HealthHistory = e.target.value)
                    }
                  />
                  <Input
                    label="Pemeriksaan Fisik"
                    placeholder="Masukkan pemeriksaan fisik pasien"
                    onChange={(e) =>
                      (patientData.PhysicalExamination = e.target.value)
                    }
                  />
                  <Input
                    label="Tindakan Terapeutik"
                    placeholder="Masukkan tindakan terapeutik pasien"
                    onChange={(e) =>
                      (patientData.TherapeuticAction = e.target.value)
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={onClose}>
                    Batal
                  </Button>
                  <Button
                    onClick={() => {
                      addPatient(patientData);
                      onClose();
                    }}
                    color="success"
                    className="text-white"
                  >
                    Simpan
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  const addPatient = async (patientData: Patient) => {
    setIsLoading(true);
    try {
      localStorage.setItem(
        "patients",
        JSON.stringify([...patients, patientData])
      );
      getPatients();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePatient = (index: number, patientData: Patient) => {
    const finalPatientRecord: Patient = {
      Name: patientData.Name,
      MedicalRecordNumber: patientData.MedicalRecordNumber,
      MedicalDiagnosis: patientData.MedicalDiagnosis,
      NursingDiagnosis: patientData.NursingDiagnosis,
      AttendingPhysician: patientData.AttendingPhysician,
      HealthHistory: patientData.HealthHistory,
      PhysicalExamination: patientData.PhysicalExamination,
      TherapeuticAction: patientData.TherapeuticAction,
    };

    return (
      <>
        <Button color="warning" className="text-white" onClick={onOpen}>
          Ubah
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-black">
                  <h2 className="text-lg font-bold">Ubah Pasien</h2>
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Nama"
                    placeholder="Masukkan nama pasien"
                    defaultValue={finalPatientRecord.Name}
                    onChange={(e) => (finalPatientRecord.Name = e.target.value)}
                  />
                  <Input
                    label="No RM"
                    placeholder="Masukkan nomor rekam medis pasien"
                    defaultValue={finalPatientRecord.MedicalRecordNumber}
                    onChange={(e) =>
                      (finalPatientRecord.MedicalRecordNumber = e.target.value)
                    }
                  />
                  <Input
                    label="Diagnosa Medis"
                    placeholder="Masukkan diagnosa medis pasien"
                    defaultValue={finalPatientRecord.MedicalDiagnosis}
                    onChange={(e) =>
                      (finalPatientRecord.MedicalDiagnosis = e.target.value)
                    }
                  />
                  <Input
                    label="Diagnosa Keperawatan"
                    placeholder="Masukkan diagnosa keperawatan pasien"
                    defaultValue={finalPatientRecord.NursingDiagnosis}
                    onChange={(e) =>
                      (finalPatientRecord.NursingDiagnosis = e.target.value)
                    }
                  />
                  <Input
                    label="Dokter yang merawat"
                    placeholder="Masukkan nama dokter yang merawat pasien"
                    defaultValue={finalPatientRecord.AttendingPhysician}
                    onChange={(e) =>
                      (finalPatientRecord.AttendingPhysician = e.target.value)
                    }
                  />
                  <Input
                    label="Riwayat Kesehatan"
                    placeholder="Masukkan riwayat kesehatan pasien"
                    defaultValue={finalPatientRecord.HealthHistory}
                    onChange={(e) =>
                      (finalPatientRecord.HealthHistory = e.target.value)
                    }
                  />
                  <Input
                    label="Pemeriksaan Fisik"
                    placeholder="Masukkan pemeriksaan fisik pasien"
                    defaultValue={finalPatientRecord.PhysicalExamination}
                    onChange={(e) =>
                      (finalPatientRecord.PhysicalExamination = e.target.value)
                    }
                  />
                  <Input
                    label="Tindakan Terapeutik"
                    placeholder="Masukkan tindakan terapeutik pasien"
                    defaultValue={finalPatientRecord.TherapeuticAction}
                    onChange={(e) =>
                      (finalPatientRecord.TherapeuticAction = e.target.value)
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={onClose}>
                    Batal
                  </Button>
                  <Button
                    onClick={() => {
                      updatePatient(index, finalPatientRecord);
                      onClose();
                    }}
                    color="success"
                    className="text-white"
                  >
                    Simpan
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  const updatePatient = async (id: number, patientData: Patient) => {
    setIsLoading(true);
    try {
      const updatedPatient = {
        Name: patientData.Name,
        MedicalRecordNumber: patientData.MedicalRecordNumber,
        MedicalDiagnosis: patientData.MedicalDiagnosis,
        NursingDiagnosis: patientData.NursingDiagnosis,
        AttendingPhysician: patientData.AttendingPhysician,
        HealthHistory: patientData.HealthHistory,
        PhysicalExamination: patientData.PhysicalExamination,
        TherapeuticAction: patientData.TherapeuticAction,
      };
      const updatedPatients = patients.map((patient, index) =>
        index === id ? updatedPatient : patient
      );
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      getPatients();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePatient = async (id: number) => {
    setIsLoading(true);
    try {
      const updatedPatients = patients.filter((_, index) => index !== id);
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      getPatients();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredPatients = JSON.parse(
      localStorage.getItem("patients") || "[]"
    ).filter(
      (patient: Patient) =>
        patient.Name.toLowerCase().includes(searchValue) ||
        patient.MedicalRecordNumber.toLowerCase().includes(searchValue) ||
        patient.MedicalDiagnosis.toLowerCase().includes(searchValue) ||
        patient.AttendingPhysician.toLowerCase().includes(searchValue)
    );
    setPatients(filteredPatients);
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex items-center justify-center w-16 h-16 border-4 border-t-[4px] border-gray-800 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-white mb-8">
            Patient Management System
          </h1>
          <div className="space-y-8 bg-gray-50 p-8 rounded-lg shadow-md min-h-[800px]">
            <h1 className="text-2xl font-bold text-black">Daftar Pasien</h1>
            <div className="flex justify-between w-full">
              {handleAddPatient()}
              <Input
                placeholder="Cari pasien..."
                className="w-1/4 text-black bg-white border-none rounded-md"
                onChange={(e) => handleSearchPatient(e)}
                variant="bordered"
              />
            </div>
            <Table isStriped aria-label="Pasien" className="h-full">
              <TableHeader>
                {tableHeaderItems.map((header) => (
                  <TableColumn key={header.key} className={header.className}>
                    {header.label}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent="Tidak ada data yang tersedia">
                {patients.map((patient, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      onOpen();
                      handleUpdatePatient(index, patient);
                    }}
                  >
                    <TableCell className="text-center text-black">
                      {patient.Name}
                    </TableCell>
                    <TableCell className="text-center text-black">
                      {patient.MedicalRecordNumber}
                    </TableCell>
                    <TableCell className="text-center text-black">
                      {patient.MedicalDiagnosis}
                    </TableCell>
                    <TableCell className="text-center text-black">
                      {patient.AttendingPhysician}
                    </TableCell>
                    <TableCell className="text-center text-black space-x-4">
                      {handleUpdatePatient(index, patient)}
                      <Button
                        color="danger"
                        className="text-white"
                        onClick={() => deletePatient(index)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
