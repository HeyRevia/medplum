import { Loader, Tabs } from '@mantine/core';
import { capitalize, getReferenceString } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { Document, PatientHeader, useMedplum } from '@medplum/react';
import { JSX, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeadlessPrescription } from '../components/headless-prescription/HeadlessPrescription';
import { PatientHistory } from '../components/PatientHistory';
import { PatientOverview } from '../components/PatientOverview';
import { PatientPrescription } from '../components/PatientPrescription';
import { Timeline } from '../components/Timeline';

export function PatientPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const medplum = useMedplum();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      medplum.readResource('Patient', id).then(setPatient).catch(console.error);
    }
  }, [medplum, id]);

  const tabs = ['overview', 'timeline', 'history', 'prescription', 'headless'];
  const tab = window.location.pathname.split('/').pop();
  const currentTab = tab && tabs.includes(tab) ? tab : tabs[0];

  function handleTabChange(newTab: string | null): void {
    navigate(`/Patient/${id}/${newTab ?? ''}`)?.catch(console.error);
  }

  if (!patient) {
    return <Loader />;
  }

  return (
    <Document key={getReferenceString(patient)}>
      <PatientHeader patient={patient} />
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tabs.List>
          {tabs.map((tab, i) => (
            <Tabs.Tab value={tab} key={i}>
              {capitalize(tab)}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value="overview">
          <PatientOverview />
        </Tabs.Panel>
        <Tabs.Panel value="timeline">
          <Timeline />
        </Tabs.Panel>
        <Tabs.Panel value="history">
          <PatientHistory />
        </Tabs.Panel>
        <Tabs.Panel value="prescription">
          <PatientPrescription patient={patient} />
        </Tabs.Panel>
        <Tabs.Panel value="headless">
          <HeadlessPrescription patient={patient} />
        </Tabs.Panel>
      </Tabs>
    </Document>
  );
}
