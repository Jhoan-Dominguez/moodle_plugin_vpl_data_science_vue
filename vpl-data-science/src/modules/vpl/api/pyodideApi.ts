import { loadPyodide } from 'pyodide';

export const PyodideApi = async (pythonCode: string, whl_url: string) => {
    
    const pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full',
        stderr: (msg) => console.log(msg),
        stdout: (msg) => console.log(`Pyodide: ${msg}`),
    });

    await pyodide.loadPackage('micropip');
    await pyodide.runPythonAsync(`
import micropip
await micropip.install('${whl_url}')
`);

    await pyodide.runPythonAsync(`def get_output_logs(custom_function):
    import io
    import sys
    import traceback
    import micropip
    from helper import helper

    try:
        output_logs = io.StringIO()
        custom_function()

        sys.stdout = sys.__stdout__
        contenido = output_logs.getvalue()
        output_logs.close()
        
        helper.my_test_function()

    except Exception as e:
        traceback_details = traceback.format_exc()
        print(traceback_details)

${pythonCode}`);
};
