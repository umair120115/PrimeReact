import  { useState, useEffect} from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { DataTablePageEvent, DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';

interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  place_of_origin: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

const Page = () => {
  const [data, setData] = useState<Artwork[]>([]); 
  const [page, setPage] = useState<number>(0); 
  const [totalRecords, setTotalRecords] = useState<number>(0); 
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]); 
  // const [rowsPerPage, setRowsPerPage] = useState<number>(12); 
  const [showOverlay, setShowOverlay] = useState<boolean>(false); 
  const [rowsToSelect, setRowsToSelect] = useState<number>(1); 
  const rowsPerPage= 12;
 
  useEffect(() => {
    getData(page, rowsPerPage);
  }, [page, rowsPerPage]);

 
  const getData = async (pageNumber: number, limit: number): Promise<void> => {
    try {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${pageNumber + 1}&limit=${limit}`
      );
      const artworks: Artwork[] = response.data.data.map((item: any) => ({
        id: item.id,
        title: item.title || 'Unknown Title',
        artist_display: item.artist_display || 'Unknown Artist',
        place_of_origin: item.place_of_origin || 'Unknown Origin',
        inscriptions: item.inscriptions || 'No Inscriptions',
        date_start: item.date_start || 'No date',
        date_end: item.date_end || 'No date',
      }));
      setData(artworks);
      setTotalRecords(response.data.pagination.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  const onPageChange = (event: DataTablePageEvent): void => {
    setPage(event.page ?? 0);
  };

 
  const onSelectionChange = (event: DataTableSelectionMultipleChangeEvent<Artwork[]>): void => {
    setSelectedRows(event.value as unknown as Artwork[]);
  };

  
  const handleSelectRows = (): void => {
    if (rowsToSelect !== null && rowsToSelect > 0) {
      const rowsToSelectLimited = Math.min(rowsToSelect, data.length); 
      const selected = data.slice(0, rowsToSelectLimited); 
      setSelectedRows((prev) => [
        ...prev.filter((row) => !data.some((d) => d.id === row.id)), 
        ...selected,
      ]);
    }
    setShowOverlay(false); 
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsToSelect(Number(e.target.value) || 1);  // Convert to number and fallback to 1 if invalid
  };
  

  return (
    <>
      <h1>Artworks</h1>
      <div className="card">
        <DataTable
          value={data}
          paginator
          rows={rowsPerPage}
          first={page * rowsPerPage}
          onPage={onPageChange}
          lazy
          totalRecords={totalRecords}
          selection={selectedRows}
          onSelectionChange={onSelectionChange}
          tableStyle={{ minWidth: '50rem' }}
          dataKey="id"
          selectionMode="multiple" 
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
          <Column field="title" header="Title" style={{ width: '20%' }}></Column>
          <Column field="place_of_origin" header="Place of Origin" style={{ width: '20%' }}></Column>
          <Column field="artist_display" header="Artist" style={{ width: '20%' }}></Column>
          <Column field="inscriptions" header="Inscriptions" style={{ width: '20%' }}></Column>
          <Column field="date_start" header="Date Start" style={{ width: '10%' }}></Column>
          <Column field="date_end" header="Date End" style={{ width: '10%' }}></Column>
        </DataTable>
        <div style={{ marginTop: '1rem' }}>
          <Button
            label="Define Rows to Select"
            onClick={() => setShowOverlay(true)}
            style={{ marginRight: '1rem' }}
          />
          <h3>Selected Rows:</h3>
          <ul>
            {selectedRows.map((row) => (
              <li key={row.id}>{row.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <Dialog
        header="Select Rows"
        visible={showOverlay}
        onHide={() => setShowOverlay(false)}
        footer={
          <div>
            <Button label="Cancel" onClick={() => setShowOverlay(false)} />
            <Button label="Apply" onClick={handleSelectRows} />
          </div>
        }
      >
        <div>
          <label htmlFor="rowsToSelect" style={{ marginRight: '1rem' }}>
            Enter Number of Rows to Select:
          </label>
          <InputNumber
            id="rowsToSelect"
            value={rowsToSelect}
            onVolumeChange={handleChange}
            min={1}
            max={rowsPerPage}
            style={{ width: '5rem' }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default Page;