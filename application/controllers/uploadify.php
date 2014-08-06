<?php

class Uploadify extends CI_Controller
{

    public $view_data = array();
    private $upload_config;
    private $image_upload_folder;

    function __construct()
    {
        parent::__construct();
        $this->image_upload_folder = FCPATH . '/assets/uploads';
    }

    public function index()
    {
        $this->load->helper(array('url', 'form'));
        $this->load->view('uploadify', $this->view_data);
    }

    public function do_upload()
    {
        
        $this->load->library('upload');
        $this->load->model('graphic_image_model');    

        if (!file_exists($this->image_upload_folder)) {
            mkdir($this->image_upload_folder, DIR_WRITE_MODE, true);
        }

        $id = $this->graphic_image_model->add();

        $this->upload_config = array(
            'upload_path'   => $this->image_upload_folder,
            'allowed_types' => 'png',
            'max_size'      => 4096,
            'remove_space'  => TRUE,
            'encrypt_name'  => TRUE            
        );
 

        $this->upload->initialize($this->upload_config);        
        if (!$this->upload->do_upload()) {
            $upload_error = $this->upload->display_errors();
            echo json_encode($upload_error);
        } else {        
            $fileInfo = $this->upload->data();
            $moveFileParams['file_path'] = $fileInfo['file_path'];
            $moveFileParams['file_name'] = $fileInfo['file_name'];
            $moveFileParams['file_ext'] = $fileInfo['file_ext'];
            $moveFileParams['file_id'] = $id;
            $moveFileParams['player_id'] = $this->input->post('playerId');             
           $imageLocation = $this->moveFile($moveFileParams );

            $response['file_id'] = $id;
            $response['image_location'] =  base_url() . $imageLocation;


            echo json_encode($response);                  
        }

    }

    function do_delete($id){
        $this->load->model('graphic_image_model');
        $file = $this->graphic_image_model->get($id);
        $filePath = $this->image_upload_folder . "/graphics/" . $file['player_id'] . "/" . $file['id'] . ".png";
        unlink($filePath);
        $this->graphic_image_model->delete($id);
    }

    private function moveFile($params){
        $oldPath = $params['file_path'] . $params['file_name'];
        $newFolder = $params['file_path'] . 'graphics/' . $params['player_id'];
        $newPath = $newFolder . '/' . $params['file_id'] . $params['file_ext'];
        if (!file_exists($newFolder)) {
            mkdir($newFolder, DIR_WRITE_MODE, true);
        }
        rename($oldPath, $newPath);

        $imageLocation = 'assets/uploads/graphics/' . $params['player_id'] . '/' . $params['file_id'] . $params['file_ext'];
        return $imageLocation;
    }

}

?>